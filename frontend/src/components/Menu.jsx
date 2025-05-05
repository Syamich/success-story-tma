import React from 'react';
import './Menu.css';

const Menu = ({ performAction }) => {
    if (typeof performAction !== 'function') {
        console.error('performAction is not a function:', performAction);
        return <div>Error: Menu functionality is broken. Check performAction prop.</div>;
    }

    return (
        <div className="menu-container">
            <h2>Действия</h2>
            <div className="category">
                <h3>🍽️ Еда</h3>
                <button className="menu-button" onClick={() => performAction('eat_dump')}>
                    🤢 Пожрать на помойке
                </button>
                <button className="menu-button" disabled>
                    🍔 Купить еду
                </button>
            </div>
            <div className="category">
                <h3>😊 Настроение</h3>
                <button className="menu-button" disabled>
                    🎭 Улучшить настроение
                </button>
            </div>
        </div>
    );
};

export default Menu;
