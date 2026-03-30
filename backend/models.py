from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    xp = Column(Integer, default=0)
    scores = relationship("Score", back_populates="owner")
    achievements = relationship("Achievement", back_populates="owner")

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String, index=True)
    category = Column(String, index=True)
    difficulty = Column(String, index=True) # easy, medium, hard
    options = Column(JSON) # e.g. ["A", "B", "C", "D"]
    correct_answer = Column(String)
    explanation = Column(String)

class Score(Base):
    __tablename__ = "scores"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score_value = Column(Integer)
    difficulty_level = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    owner = relationship("User", back_populates="scores")

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_name = Column(String)
    earned_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner = relationship("User", back_populates="achievements")
