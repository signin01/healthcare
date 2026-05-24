import React, { useState } from 'react';

function HealthTips() {
    const [activeTip, setActiveTip] = useState(0);
    const tips = [
        { title: 'Stay Hydrated', content: 'Drink 8-10 glasses of water daily for optimal health.' },
        { title: 'Eat Healthy', content: 'Include fruits, vegetables, and whole grains in your diet.' },
        { title: 'Exercise Daily', content: '30 minutes of moderate exercise 5 days a week.' },
        { title: 'Sleep Well', content: '7-8 hours of quality sleep is essential.' },
        { title: 'Manage Stress', content: 'Practice meditation or deep breathing exercises.' }
    ];

    const quickTips = [
        'Eat seasonal fruits for immunity',
        'Apply sunscreen daily',
        'Brush twice a day',
        'Take screen breaks every hour',
        'Wash hands regularly',
        'Get enough vitamin D'
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>Daily Health Tips</h3>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
                <h2>{tips[activeTip].title}</h2>
                <p style={{ fontSize: '18px', margin: '20px 0' }}>{tips[activeTip].content}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {tips.map((_, idx) => (
                        <button key={idx} onClick={() => setActiveTip(idx)} style={{ width: '10px', height: '10px', borderRadius: '50%', background: activeTip === idx ? 'white' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: '0' }} />
                    ))}
                </div>
            </div>
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {quickTips.map((tip, idx) => (
                    <div key={idx} style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                        {tip}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HealthTips;
