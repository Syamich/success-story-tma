import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import Command

API_TOKEN = 'YOUR_BOT_TOKEN'  # Замените на ваш токен
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command(commands=['start']))
async def start_command(message: Message):
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    web_app = WebAppInfo(url='https://success-story-tma-production.up.railway.app')
    button = KeyboardButton(text='Открыть игру', web_app=web_app)
    keyboard.add(button)
    await message.reply('Нажми, чтобы начать игру!', reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
