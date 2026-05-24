import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function EmergencyContacts() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('emergencyContacts');
        if (saved) setContacts(JSON.parse(saved));
    }, []);

    const addContact = () => {
        if (!name || !phone) { toast.error('Fill all fields'); return; }
        const contact = { id: Date.now(), name, phone };
        const updated = [...contacts, contact];
        setContacts(updated);
        localStorage.setItem('emergencyContacts', JSON.stringify(updated));
        setName(''); setPhone('');
        toast.success('Emergency contact added!');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Emergency Contacts</h3>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <input type="text" placeholder="Contact name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={addContact} style={{ width: '100%', padding: '10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Emergency Contact</button>
            </div>
            {contacts.map(c => (
                <div key={c.id} style={{ background: '#ffebee', padding: '15px', marginTop: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><strong>{c.name}</strong><br />?? {c.phone}</div>
                    <a href={`tel:${c.phone}`} style={{ background: '#4caf50', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' }}>Call</a>
                </div>
            ))}
        </div>
    );
}
export default EmergencyContacts;
