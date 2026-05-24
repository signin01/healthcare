import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function BloodSugarTracker() {
    const [readings, setReadings] = useState([]);
    const [value, setValue] = useState('');
    const [type, setType] = useState('Fasting');

    useEffect(() => {
        const saved = localStorage.getItem('sugarReadings');
        if (saved) setReadings(JSON.parse(saved));
    }, []);

    const addReading = () => {
        if (!value) { toast.error('Enter value'); return; }
        const reading = { id: Date.now(), value: parseInt(value), type, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() };
        const updated = [reading, ...readings];
        setReadings(updated);
        localStorage.setItem('sugarReadings', JSON.stringify(updated));
        setValue('');
        toast.success('Reading added!');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Blood Sugar Tracker</h3>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <option>Fasting</option><option>Post Meal</option><option>Random</option>
                </select>
                <input type="number" placeholder="Blood Sugar (mg/dL)" value={value} onChange={(e) => setValue(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addReading} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Reading</button>
            </div>
            {readings.map(r => (
                <div key={r.id} style={{ background: '#e3f2fd', padding: '15px', marginTop: '10px', borderRadius: '10px' }}>
                    {r.type}: {r.value} mg/dL<br />?? {r.date} at {r.time}
                </div>
            ))}
        </div>
    );
}
export default BloodSugarTracker;
