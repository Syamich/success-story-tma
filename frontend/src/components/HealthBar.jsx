import React from 'react';
import './HealthBar.css';

const HealthBar = ({ value }) => {
    return (
        <div className="health-bar">
            <div className="health-bar-fill" style={{ width: `${value}%` }}>
                💉 {value}%
            </div>
        </div>
    );
};

export default HealthBar;
