import asyncio
from database import engine
from sqlalchemy import text

async def query():
    async with engine.begin() as conn:
        res = await conn.execute(text('SELECT * FROM users;'))
        users = res.fetchall()
        print("USERS:", users)

asyncio.run(query())
