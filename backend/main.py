from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import random
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Настройка CORS
logger.info("Setting up CORS middleware")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://success-story-tma-production.up.railway.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

def load_players():
    try:
        with open('players.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_players(players):
    with open('players.json', 'w') as f:
        json.dump(players, f)

players = load_players()

class PlayerAction(BaseModel):
    userId: str
    action: str

def create_player():
    return {
        'day': 1,
        'health': 100,
        'satiety': 50,
        'mood': 50,
        'money': 0,
        'status': 'Бездомный',
        'zero_health_days': 0,
        'zero_satiety_days': 0,
        'zero_mood_days': 0,
        'age': 18,
        'death_age': random.randint(65, 95),
        'transport': 'Нет',
        'housing': 'Нет',
        'rating': 0,
        'bottles': 0,
        'bottle_price': random.randint(1, 10),
        'dollars': 0,
        'dollar_rate': 34.0,
        'rate_state': 'normal',
        'rate_event_days': 0,
        'married': False,
        'has_sneakers': False,
        'has_bike': False,
        'gym_subscription': False,
        'gym_days_left': 0,
        'personal_trainer': False,
        'trainer_days_left': 0,
        'immortality_pill': False,
        'fortune_told': False,
        'bar_drinking': False,
        'last_news': 'Добро пожаловать в "История успеха"! Ты бездомный в большом городе.',
        'has_passport': False,
        'learned_multiplication': False,
        'finished_school': False,
        'has_tent': False,
        'finished_vocational': False,
        'renting_apartment': False,
        'renting_days_left': 0,
        'mortgage_apartment': False,
        'mortgage_days_left': 0
    }

@app.get("/player/{user_id}")
async def get_player(user_id: str):
    logger.info(f"Fetching player with user_id: {user_id}")
    if user_id not in players:
        players[user_id] = create_player()
        save_players(players)
    return players[user_id]

@app.options("/action")
async def options_action():
    logger.info("Handling OPTIONS request for /action")
    return {}

@app.post("/action")
async def perform_action(data: PlayerAction):
    logger.info(f"Performing action: {data.action} for user_id: {data.userId}")
    user_id = data.userId
    action = data.action
    if user_id not in players:
        players[user_id] = create_player()

    player = players[user_id]
    message = ""
    action_success = True

    if action == "eat_dump":
        bottles_found = random.randint(0, 5)
        satiety_increase = random.randint(10, 12)
        health_decrease = 5
        mood_decrease = 5
        player['satiety'] += satiety_increase
        player['health'] -= health_decrease
        player['mood'] -= mood_decrease
        player['bottles'] += bottles_found
        player['satiety'] = max(0, min(100, player['satiety']))
        player['health'] = max(5 if player['gym_subscription'] or player['personal_trainer'] else 0, min(100, player['health']))
        player['mood'] = max(5 if player['gym_subscription'] or player['personal_trainer'] else 0, min(100, player['mood']))
        message = f"Ты поел на помойке. Сытость +{satiety_increase}, здоровье -{health_decrease}, настроение -{mood_decrease}. Нашёл {bottles_found} бутылок. 🤢 "
        player['last_news'] = message
        player['day'] += 1
        save_players(players)  # Исправлено: передаём аргумент players
    else:
        message = "Действие не реализовано."
        action_success = False

    return {"player": player, "message": message}
