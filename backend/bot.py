from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

API_TOKEN = '7703114907:AAE-Bffp3W4XMcB0y3GghHez8E1hEW7x85Q'  # Замените на ваш токен
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start_command(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    web_app = types.WebAppInfo(url='https://success-story-tma-production.up.railway.app')
    button = types.KeyboardButton(text='Открыть игру', web_app=web_app)
    keyboard.add(button)
    await message.reply('Нажми, чтобы начать игру!', reply_markup=keyboard)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
