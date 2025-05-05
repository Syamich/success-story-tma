import React from 'react';
import './Menu.css';

const Menu = ({ performAction }) => {
    if (typeof performAction !== 'function') {
        console.error('performAction is not a function:', performAction);
        return <div>Error: Menu functionality is broken. Check performAction prop.</div>;
    }

    return (
        <div className="menu-container">
            <button className="menu-button" onClick={() => performAction('eat_dump')}>
                🤢 Пожрать на помойке
            </button>
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
