import React, { useState } from 'react';

function YogaMeditation() {
    const [videos] = useState([
        { name: 'Morning Yoga', duration: '15 min', level: 'Beginner' },
        { name: 'Stress Relief', duration: '10 min', level: 'All levels' },
        { name: 'Sleep Meditation', duration: '20 min', level: 'Beginner' }
    ]);

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Yoga & Meditation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                {videos.map(v => (
                    <div key={v.name} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                        <h4>{v.name}</h4>
                        <p>?? {v.duration} ? {v.level}</p>
                        <button style={{ background: 'white', color: '#667eea', padding: '8px 15px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Start Session</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default YogaMeditation;
