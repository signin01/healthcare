import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function BPTracker() {
    const [readings, setReadings] = useState([]);
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('bpReadings');
        if (saved) setReadings(JSON.parse(saved));
    }, []);

    const addReading = () => {
        if (!systolic || !diastolic) { toast.error('Enter values'); return; }
        const reading = { id: Date.now(), systolic: parseInt(systolic), diastolic: parseInt(diastolic), date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() };
        const updated = [reading, ...readings];
        setReadings(updated);
        localStorage.setItem('bpReadings', JSON.stringify(updated));
        setSystolic(''); setDiastolic('');
        toast.success('BP reading added!');
    };

    const getStatus = (sys, dia) => {
        if (sys < 120 && dia < 80) return 'Normal';
        if (sys < 130 && dia < 80) return 'Elevated';
        if (sys < 140 || dia < 90) return 'High BP Stage 1';
        return 'High BP Stage 2';
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Blood Pressure Tracker</h3>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" placeholder="Systolic (top)" value={systolic} onChange={(e) => setSystolic(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <input type="number" placeholder="Diastolic (bottom)" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <button onClick={addReading} style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add</button>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                {readings.map(r => (
                    <div key={r.id} style={{ background: '#e3f2fd', padding: '15px', marginBottom: '10px', borderRadius: '10px' }}>
                        <strong>{r.systolic}/{r.diastolic} mmHg</strong><br />
                        Date: {r.date} at {r.time}<br />
                        Status: {getStatus(r.systolic, r.diastolic)}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BPTracker;
