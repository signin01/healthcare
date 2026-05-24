import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function ExpiryAlerts() {
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('expiryMedicines');
        if (saved) setMedicines(JSON.parse(saved));
    }, []);

    const addMedicine = () => {
        if (!name || !expiryDate) { toast.error('Fill all fields'); return; }
        const newMed = { id: Date.now(), name, expiryDate };
        const updated = [...medicines, newMed];
        setMedicines(updated);
        localStorage.setItem('expiryMedicines', JSON.stringify(updated));
        setName(''); setExpiryDate('');
        toast.success('Medicine added!');
    };

    const getDaysLeft = (expiry) => {
        const today = new Date();
        const expiryDt = new Date(expiry);
        const diffTime = expiryDt - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Medicine Expiry Alerts</h3>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <input type="text" placeholder="Medicine name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addMedicine} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Medicine</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {medicines.map(m => {
                    const daysLeft = getDaysLeft(m.expiryDate);
                    return (
                        <div key={m.id} style={{ background: daysLeft < 30 ? '#ffebee' : '#e8f5e9', padding: '15px', marginBottom: '10px', borderRadius: '10px', borderLeft: daysLeft < 30 ? '4px solid #f44336' : '4px solid #4caf50' }}>
                            <strong>{m.name}</strong><br />Expires: {m.expiryDate}<br />
                            {daysLeft < 0 ? <span style={{ color: '#f44336' }}>?? EXPIRED!</span> : <span>{daysLeft} days left</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ExpiryAlerts;
