from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    xp: int
    class Config:
        from_attributes = True

# --- Question Schemas ---
class QuestionBase(BaseModel):
    question_text: str
    category: str
    difficulty: str
    options: List[str]
    correct_answer: str
    explanation: Optional[str] = None

class QuestionCreate(QuestionBase):
    pass

class QuestionResponse(QuestionBase):
    id: int
    class Config:
        from_attributes = True

# --- Score Schemas ---
class ScoreBase(BaseModel):
    score_value: int
    difficulty_level: str

class ScoreCreate(ScoreBase):
    pass

class ScoreResponse(ScoreBase):
    id: int
    user_id: int
    timestamp: datetime.datetime
    class Config:
        from_attributes = True

# --- Analytics / Dashboard schemas ---
class LeaderboardEntry(BaseModel):
    username: str
    xp: int
