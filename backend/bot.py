import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from aiogram.filters import Command

API_TOKEN = '7703114907:AAE-Bffp3W4XMcB0y3GghHez8E1hEW7x85Q'
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command(commands=['start']))
async def start_command(message: Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text='Открыть игру', web_app=WebAppInfo(url='https://success-story-tma-production.up.railway.app'))]
        ],
        resize_keyboard=True
    )
    await message.reply('Нажми, чтобы начать игру!', reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
