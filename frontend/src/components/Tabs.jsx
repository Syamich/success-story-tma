import React from 'react';
import './Tabs.css';

const Tabs = ({ currentTab, setCurrentTab }) => {
    const tabs = [
        { emoji: '🏠', label: 'Главная' },
        { emoji: '🎮', label: 'Действия' },
    ];

    return (
        <div className="tabs-container">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab-button ${currentTab === index ? 'active' : ''}`}
                    onClick={() => setCurrentTab(index)}
                >
                    {tab.emoji}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
