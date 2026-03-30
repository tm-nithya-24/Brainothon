import asyncio
from database import SessionLocal, engine
from models import Question, Base
from sqlalchemy import text
from seed_data import SEED_QUESTIONS

async def force_seed():
    async with SessionLocal() as db:
        await db.execute(text("DELETE FROM questions"))
        for q_data in SEED_QUESTIONS:
            db.add(Question(**q_data))
        await db.commit()
        print("SEED COMPLETE")

asyncio.run(force_seed())
