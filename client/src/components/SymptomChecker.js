import React, { useState } from 'react';
import toast from 'react-hot-toast';

function SymptomChecker() {
    const [symptoms, setSymptoms] = useState([]);
    const [result, setResult] = useState('');

    const commonSymptoms = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Body Pain', 'Sore Throat', 'Runny Nose', 'Nausea'];

    const toggleSymptom = (symptom) => {
        if (symptoms.includes(symptom)) {
            setSymptoms(symptoms.filter(s => s !== symptom));
        } else {
            setSymptoms([...symptoms, symptom]);
        }
    };

    const checkSymptoms = () => {
        if (symptoms.length === 0) { toast.error('Select symptoms'); return; }
        if (symptoms.includes('Fever') && symptoms.includes('Cough')) setResult('Possible Cold/Flu. Rest and stay hydrated.');
        else if (symptoms.includes('Headache') && symptoms.includes('Fatigue')) setResult('Possible stress or dehydration. Rest well.');
        else if (symptoms.includes('Fever') && symptoms.includes('Body Pain')) setResult('Possible viral infection. Consult doctor if persists.');
        else setResult('Consult a doctor for proper diagnosis.');
        toast.info('Analysis complete');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Symptom Checker</h3>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <p>Select your symptoms:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                    {commonSymptoms.map(s => (
                        <button key={s} onClick={() => toggleSymptom(s)} style={{ padding: '8px 15px', background: symptoms.includes(s) ? '#4caf50' : '#ddd', color: symptoms.includes(s) ? 'white' : '#333', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>{s}</button>
                    ))}
                </div>
                <button onClick={checkSymptoms} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Check Symptoms</button>
                {result && <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>{result}<br /><small>?? This is not a medical diagnosis. Consult a doctor.</small></div>}
            </div>
        </div>
    );
}
export default SymptomChecker;
