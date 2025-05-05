import React from 'react';
import './MoodBar.css';

const MoodBar = ({ value }) => {
    return (
        <div className="mood-bar">
            <div className="mood-bar-fill" style={{ height: `${value}%` }}>
                😊 {value}%
            </div>
        </div>
    );
};

export default MoodBar;
