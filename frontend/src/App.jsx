import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import StatusBar from './components/StatusBar';
import Menu from './components/Menu';
import Notification from './components/Notification';
import './App.css';

WebApp.ready();

function App() {
  const [player, setPlayer] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const userId = WebApp.initDataUnsafe.user?.id || 'test123'; // Временный userId для тестов
    console.log('User ID:', userId); // Для отладки
    if (userId) {
      fetch(`https://backend-production-bc4d.up.railway.app/player/${userId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Player data:', data); // Для отладки
          setPlayer(data);
        })
        .catch(error => {
          console.error('Error fetching player:', error);
          setPlayer(createPlayer());
        });
    } else {
      console.error('No userId found');
      setPlayer(createPlayer());
    }
  }, []);

  const createPlayer = () => ({
    day: 1,
    health: 100,
    satiety: 50,
    mood: 50,
    money: 0,
    status: 'Бездомный',
    zero_health_days: 0,
    zero_satiety_days: 0,
    zero_mood_days: 0,
    age: 18,
    death_age: Math.floor(Math.random() * (95 - 65 + 1)) + 65,
    transport: 'Нет',
    housing: 'Нет',
    rating: 0,
    bottles: 0,
    bottle_price: Math.floor(Math.random() * 10) + 1,
    dollars: 0,
    dollar_rate: 34.0,
    rate_state: 'normal',
    rate_event_days: 0,
    married: false,
    has_sneakers: false,
    has_bike: false,
    gym_subscription: false,
    gym_days_left: 0,
    personal_trainer: false,
    trainer_days_left: 0,
    immortality_pill: false,
    fortune_told: false,
    bar_drinking: false,
    last_news: 'Добро пожаловать в "История успеха"! Ты бездомный в большом городе.',
    has_passport: false,
    learned_multiplication: false,
    finished_school: false,
    has_tent: false,
    finished_vocational: false,
    renting_apartment: false,
    renting_days_left: 0,
    mortgage_apartment: false,
    mortgage_days_left: 0
  });

  const handleAction = async (action) => {
    const userId = WebApp.initDataUnsafe.user?.id || 'test123';
    console.log('Performing action:', action, 'for user:', userId); // Для отладки
    try {
      const response = await fetch('https://backend-production-bc4d.up.railway.app/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { player: updatedPlayer, message } = await response.json();
      setPlayer(updatedPlayer);
      setNotification(message);
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error performing action:', error);
      setNotification('Ошибка при выполнении действия');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  if (!player) return <div>Загрузка...</div>;

  return (
    <div className="App">
      <StatusBar player={player} />
      <Notification message={notification} />
      <Menu handleAction={handleAction} player={player} />
    </div>
  );
}

export default App;
