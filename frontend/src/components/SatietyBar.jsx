import React from 'react';
import './SatietyBar.css';

const SatietyBar = ({ value }) => {
    return (
        <div className="satiety-bar">
            <div className="satiety-bar-fill" style={{ height: `${value}%` }}>
                🍽️ {value}%
            </div>
        </div>
    );
};

export default SatietyBar;
