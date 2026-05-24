import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function MedicineReminder() {
    const [reminders, setReminders] = useState([]);
    const [medicine, setMedicine] = useState('');
    const [time, setTime] = useState('');
    const [dosage, setDosage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('reminders');
        if (saved) setReminders(JSON.parse(saved));
    }, []);

    const addReminder = () => {
        if (!medicine || !time) { toast.error('Fill all fields'); return; }
        const newReminder = { id: Date.now(), medicine, time, dosage, status: 'Active' };
        const updated = [...reminders, newReminder];
        setReminders(updated);
        localStorage.setItem('reminders', JSON.stringify(updated));
        setMedicine(''); setTime(''); setDosage('');
        toast.success('Reminder added!');
    };

    const deleteReminder = (id) => {
        const updated = reminders.filter(r => r.id !== id);
        setReminders(updated);
        localStorage.setItem('reminders', JSON.stringify(updated));
        toast.success('Reminder deleted');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Medicine Reminder</h3>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <input type="text" placeholder="Medicine name" value={medicine} onChange={(e) => setMedicine(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Dosage (e.g., 1 tablet)" value={dosage} onChange={(e) => setDosage(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addReminder} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Reminder</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {reminders.map(r => (
                    <div key={r.id} style={{ background: '#e8f5e9', padding: '15px', marginBottom: '10px', borderRadius: '10px' }}>
                        <strong>{r.medicine}</strong><br />Time: {r.time}<br />Dosage: {r.dosage}<br />
                        <button onClick={() => deleteReminder(r.id)} style={{ marginTop: '10px', padding: '5px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MedicineReminder;
