import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function HealthRecords() {
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({ title: '', date: '', description: '' });

    useEffect(() => {
        const saved = localStorage.getItem('healthRecords');
        if (saved) setRecords(JSON.parse(saved));
    }, []);

    const addRecord = () => {
        if (!newRecord.title) { toast.error('Enter title'); return; }
        const record = { ...newRecord, id: Date.now() };
        const updated = [...records, record];
        setRecords(updated);
        localStorage.setItem('healthRecords', JSON.stringify(updated));
        setNewRecord({ title: '', date: '', description: '' });
        toast.success('Record added!');
    };

    const deleteRecord = (id) => {
        const updated = records.filter(r => r.id !== id);
        setRecords(updated);
        localStorage.setItem('healthRecords', JSON.stringify(updated));
        toast.success('Record deleted');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Health Records</h3>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <input type="text" placeholder="Record title (e.g., Blood Test)" value={newRecord.title} onChange={(e) => setNewRecord({...newRecord, title: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="date" value={newRecord.date} onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <textarea placeholder="Description / Results" value={newRecord.description} onChange={(e) => setNewRecord({...newRecord, description: e.target.value})} rows="3" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addRecord} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Record</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {records.map(r => (
                    <div key={r.id} style={{ background: '#e3f2fd', padding: '15px', marginBottom: '10px', borderRadius: '10px' }}>
                        <strong>{r.title}</strong><br />?? {r.date || 'No date'}<br />?? {r.description}<br />
                        <button onClick={() => deleteRecord(r.id)} style={{ marginTop: '10px', padding: '5px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HealthRecords;
