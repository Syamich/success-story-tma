import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './App.css';

const App = () => {
    const [player, setPlayer] = useState(null);
    const [message, setMessage] = useState('');
    const userId = 'test123';

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`https://backend-production-bc4d.up.railway.app/player/${userId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setPlayer(data);
            } catch (error) {
                console.error('Error fetching player:', error);
            }
        };
        fetchPlayer();
    }, []);

    const performAction = async (action) => {
        try {
            const response = await fetch('https://backend-production-bc4d.up.railway.app/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
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
            <h1>История успеха</h1>
            {player && (
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
            )}
            <Menu performAction={performAction} />
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default App;
