// File: frontend/src/components/Menu.jsx
import { useState } from 'react';
import './Menu.css';

function Menu({ handleAction, player }) {
  const menus = {
    main: [
      { label: 'Еда и Здоровье 🍽️', action: 'category_food_health' },
      { label: 'Бомжатничать 🍾', action: 'category_bum' },
      { label: 'Валюта 💵', action: 'category_currency' },
      { label: 'Работа 💼', action: 'category_work' },
      { label: 'Учёба/рейтинг 📚', action: 'category_study' },
      { label: 'Соц. услуги 🪪', action: 'category_social' },
      { label: 'Недвижимость 🏠', action: 'category_property' }
    ],
    food_health: [
      { label: 'Еда', action: 'food_submenu', category: true },
      { label: 'Настроение', action: 'mood_submenu', category: true },
      { label: 'Здоровье', action: 'health_submenu', category: true },
      { label: 'Назад ↩️', action: 'back_to_main' }
    ],
    food: [
      { label: 'Пожрать на помойке 🤢', action: 'eat_dump' },
      { label: 'Хот-Дог (100 руб.) 🌭', action: 'eat_hotdog' },
      { label: 'Кафе (500 руб.) ☕', action: 'eat_cafe' },
      { label: 'Закупиться в магазине (3000 руб.) 🛒', action: 'eat_store' },
      { label: player.married ? 'Развестись 👰' : 'Жениться (5000 руб./день) 👰', action: player.married ? 'divorce' : 'marry' },
      { label: 'Назад ↩️', action: 'category_food_health' }
    ]
  };

  const [currentMenu, setCurrentMenu] = useState('main');

  const handleButtonClick = (action) => {
    if (action.startsWith('category_') || action.endsWith('_submenu') || action === 'back_to_main') {
      setCurrentMenu(action === 'back_to_main' ? 'main' : action.replace('category_', '').replace('_submenu', ''));
    } else {
      handleAction(action);
    }
  };

  return (
    <div className="menu">
      <div className="menu-scroll">
        {menus[currentMenu].map((item, index) => (
          <button
            key={index}
            className={item.category ? 'category' : 'action'}
            onClick={() => handleButtonClick(item.action)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
