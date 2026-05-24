import React, { useState } from 'react';
import toast from 'react-hot-toast';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (!weight || !height) { toast.error('Enter weight and height'); return; }
        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(bmiValue);
        let cat = '';
        if (bmiValue < 18.5) cat = 'Underweight';
        else if (bmiValue < 25) cat = 'Normal weight';
        else if (bmiValue < 30) cat = 'Overweight';
        else cat = 'Obese';
        setCategory(cat);
        toast.success('BMI Calculated');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>BMI Calculator</h3>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={calculateBMI} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Calculate BMI</button>
                {bmi && (
                    <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>
                        <h2>BMI: {bmi}</h2>
                        <p>Category: <strong>{category}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default BMICalculator;
