import React, { useState } from 'react';
import toast from 'react-hot-toast';

function MedicineInfo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [medicine, setMedicine] = useState(null);

    const medicinesDB = {
        paracetamol: { name: 'Paracetamol', uses: 'Fever, headache, pain relief', sideEffects: 'Nausea, liver damage (overdose)', dosage: '500mg every 4-6 hours' },
        crocin: { name: 'Crocin', uses: 'Fever, cold, headache', sideEffects: 'Stomach upset', dosage: '650mg every 6 hours' },
        dolo: { name: 'Dolo 650', uses: 'Fever, body pain', sideEffects: 'Nausea, rash', dosage: '650mg every 6 hours' }
    };

    const searchMedicine = () => {
        const found = medicinesDB[searchTerm.toLowerCase()];
        if (found) setMedicine(found);
        else { toast.error('Medicine not found'); setMedicine(null); }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Medicine Information</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder="Search medicine (e.g., Paracetamol)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={searchMedicine} style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
            </div>
            {medicine && (
                <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px' }}>
                    <h3>{medicine.name}</h3>
                    <p><strong>Uses:</strong> {medicine.uses}</p>
                    <p><strong>Side Effects:</strong> {medicine.sideEffects}</p>
                    <p><strong>Dosage:</strong> {medicine.dosage}</p>
                    <p><small>?? Consult doctor before use</small></p>
                </div>
            )}
        </div>
    );
}
export default MedicineInfo;
