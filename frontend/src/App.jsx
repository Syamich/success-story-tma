import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import HealthBar from './components/HealthBar';
import MoodBar from './components/MoodBar';
import SatietyBar from './components/SatietyBar';
import Tabs from './components/Tabs';
import './App.css';

const App = () => {
    const [player, setPlayer] = useState(null);
    const [message, setMessage] = useState('');
    const [currentTab, setCurrentTab] = useState(0); // 0: Главное меню, 1: Действия
    const userId = 'test123';

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`https://backend-production-bc4d.up.railway.app/player/${userId}`);
                if (!response.ok) throw new Error(`Failed to fetch player: ${response.status}`);
                const data = await response.json();
                setPlayer(data);
            } catch (error) {
                console.error('Error fetching player:', error);
                setMessage('Ошибка загрузки данных игрока');
            }
        };
        fetchPlayer();
    }, []);

    const performAction = async (action) => {
        console.log('Performing action:', action, 'for user:', userId);
        try {
            const response = await fetch('https://backend-production-bc4d.up.railway.app/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action }),
            });
            if (!response.ok) throw new Error(`Failed to perform action: ${response.status}`);
            const data = await response.json();
            setPlayer(data.player);
            setMessage(data.message);
        } catch (error) {
            console.error('Error performing action:', error);
            setMessage('При выполнении действия произошла ошибка');
        }
    };

    return (
        <div className="app-container">
            {/* Статус-бары */}
            {player && (
                <>
                    <HealthBar value={player.health} />
                    <MoodBar value={player.mood} />
                    <SatietyBar value={player.satiety} />
                </>
            )}

            {/* Основное содержимое */}
            <div className="content">
                {currentTab === 0 ? (
                    // Вкладка 1: Главное меню
                    <div className="main-menu">
                        <h1>История успеха</h1>
                        {player ? (
                            <div className="player-stats">
                                <p>💉 Здоровье: {player.health}</p>
                                <p>🍽️ Сытость: {player.satiety}</p>
                                <p>😊 Настроение: {player.mood}</p>
                                <p>💰 Рубли: {player.money}</p>
                                <p>💵 Доллары: {player.dollars}</p>
                                <p>📅 День: {player.day}</p>
                                <p>🍼 Бутылки: {player.bottles}</p>
                                <p>{player.last_news}</p>
                            </div>
                        ) : (
                            <p>Загрузка данных игрока...</p>
                        )}
                        {/* Курс и кнопки для покупки/продажи валюты */}
                        <div className="currency-section">
                            <p>Курс: 1 💵 = 100 💰</p>
                            <div className="currency-buttons">
                                <button className="menu-button">Купить 💵</button>
                                <button className="menu-button">Продать 💵</button>
                            </div>
                        </div>
                        {/* Кнопка для продажи бутылок */}
                        <button
                            className="menu-button"
                            onClick={() => performAction('sell_bottles')}
                        >
                            🥤 Продать бутылки
                        </button>
                    </div>
                ) : (
                    // Вкладка 2: Действия
                    <Menu performAction={performAction} />
                )}
                {message && <p className="message">{message}</p>}
            </div>

            {/* Нижнее меню с вкладками */}
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
    );
};

export default App;
