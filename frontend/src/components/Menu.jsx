import React from 'react';
import './Menu.css';

const Menu = ({ performAction }) => {
    return (
        <div className="menu-container">
            <button className="menu-button" onClick={() => performAction('eat_dump')}>
                🤢 Пожрать на помойке
            </button>
            {/* Добавим заглушки для других кнопок */}
            <button className="menu-button" onClick={() => performAction('sell_bottles')}>
                🥤 Сдать бутылки
            </button>
            <button className="menu-button" disabled>
                🍔 Купить еду
            </button>
            <button className="menu-button" disabled>
                💼 Поработать
            </button>
        </div>
    );
};

export default Menu;
