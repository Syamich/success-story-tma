// File: frontend/src/components/StatusBar.jsx
import './StatusBar.css';

function StatusBar({ player }) {
  const progressBar = (value) => '█'.repeat(value / 10) + '▒'.repeat(10 - value / 10);

  return (
    <div className="status-bar">
      <p>💉 Здоровье: {player.health} {progressBar(player.health)}</p>
      <p>🍽️ Сытость: {player.satiety} {progressBar(player.satiety)}</p>
      <p>😊 Настроение: {player.mood} {progressBar(player.mood)}</p>
      <p>💰 Рубли: {player.money} руб.</p>
      <p>💵 Доллары: {player.dollars}</p>
    </div>
  );
}

export default StatusBar;
