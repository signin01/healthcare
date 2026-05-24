import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function VaccinationReminder() {
    const [vaccines, setVaccines] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('vaccines');
        if (saved) setVaccines(JSON.parse(saved));
    }, []);

    const addVaccine = () => {
        if (!name || !date) { toast.error('Fill all fields'); return; }
        const newVaccine = { id: Date.now(), name, date };
        const updated = [...vaccines, newVaccine];
        setVaccines(updated);
        localStorage.setItem('vaccines', JSON.stringify(updated));
        setName(''); setDate('');
        toast.success('Vaccination added!');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Vaccination Reminder</h3>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <input type="text" placeholder="Vaccine name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addVaccine} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Reminder</button>
            </div>
            {vaccines.map(v => (
                <div key={v.id} style={{ background: '#e8f5e9', padding: '15px', marginTop: '10px', borderRadius: '10px' }}>
                    {v.name} - Due on {v.date}
                </div>
            ))}
        </div>
    );
}
export default VaccinationReminder;
