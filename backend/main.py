from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi.security import OAuth2PasswordRequestForm
import models, schemas, auth
from database import engine, get_db, Base
from typing import List
import json
import random

from datetime import timedelta

app = FastAPI(title="Brainothon Quiz API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    from database import SessionLocal
    from seed_data import SEED_QUESTIONS
    async with SessionLocal() as db:
        result = await db.execute(select(models.Question).filter(models.Question.category == 'Python').limit(1))
        if not result.scalars().first():
            for q_data in SEED_QUESTIONS:
                db.add(models.Question(**q_data))
            await db.commit()

@app.post("/signup", response_model=schemas.UserResponse)
async def signup(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).filter(models.User.username == user.username))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_pwd = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

@app.post("/token", response_model=schemas.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).filter(models.User.username == form_data.username))
    user = result.scalars().first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/questions", response_model=List[schemas.QuestionResponse])
async def get_questions(category: str = "Python", limit: int = 15, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Question).filter(models.Question.category == category).limit(limit))
    questions = result.scalars().all()
    
    # Shuffle options
    # We must operate on the list of questions, but options is JSON. Since we modify it in memory,
    # we don't necessarily want SQLAlchemy to flag it as changed, but it's fine for the output.
    questions_list = list(questions)
    random.shuffle(questions_list)
    
    for q in questions_list:
        if q.options:
            opts = list(q.options)
            random.shuffle(opts)
            q.options = opts
            
    return questions_list

@app.post("/submit")
async def submit_answer(question_id: int, answer: str, current_user: models.User = Depends(auth.get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Question).filter(models.Question.id == question_id))
    question = result.scalars().first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
        
    is_correct = (answer == question.correct_answer)
    xp_gain = 0
    if is_correct:
        xp_gain = 10 if question.difficulty == "easy" else (20 if question.difficulty == "medium" else 30)
        current_user.xp += xp_gain
        db.add(current_user)
        # Dynamic ELI5
        eli5_expl = f"ELI5: The right answer is '{question.correct_answer}'!"
        detailed_expl = question.explanation
    else:
        eli5_expl = f"ELI5: Oops! It's actually '{question.correct_answer}'."
        detailed_expl = f"You selected {answer}, but the correct answer is {question.correct_answer} because {question.explanation}."

    # Save score iteration
    score = models.Score(user_id=current_user.id, score_value=xp_gain, difficulty_level=question.difficulty)
    db.add(score)
    await db.commit()
    await db.refresh(current_user)
    
    return {
        "correct": is_correct,
        "xp_gained": xp_gain,
        "total_xp": current_user.xp,
        "eli5": eli5_expl,
        "detailed": detailed_expl
    }

@app.get("/score", response_model=schemas.UserResponse)
async def get_score(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/leaderboard", response_model=List[schemas.LeaderboardEntry])
async def get_leaderboard(db: AsyncSession = Depends(get_db)):
    # Group by id and sort by XP descending
    result = await db.execute(select(models.User).order_by(models.User.xp.desc()).limit(10))
    users = result.scalars().all()
    return [{"username": u.username, "xp": u.xp} for u in users]

# --- WebSocket Multiplayer ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    await manager.broadcast(f"Client #{client_id} joined the live quiz room!")
    try:
        while True:
            data = await websocket.receive_text()
            # Simple broadcast for scores or readiness
            await manager.broadcast(f"Client #{client_id} answers: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the room.")
