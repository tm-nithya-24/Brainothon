import asyncio
from database import engine
from sqlalchemy import text

async def query():
    async with engine.begin() as conn:
        res = await conn.execute(text('SELECT count(*) FROM questions;'))
        print('Total questions:', res.fetchall()[0][0])

asyncio.run(query())
