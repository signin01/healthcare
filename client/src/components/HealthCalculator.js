import React, { useState } from 'react';
import toast from 'react-hot-toast';

function HealthCalculator() {
    const [calcType, setCalcType] = useState('bmi');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
        if (calcType === 'bmi') {
            const bmi = (value1 / ((value2 / 100) ** 2)).toFixed(1);
            setResult(`BMI: ${bmi} - ${bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}`);
        } else if (calcType === 'calories') {
            setResult(`Daily Calories: ${(66 + (13.7 * value1) + (5 * value2)).toFixed(0)} kcal`);
        }
        toast.success('Calculated!');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Health Calculators</h3>
            <select value={calcType} onChange={(e) => setCalcType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                <option value="bmi">BMI Calculator</option>
                <option value="calories">Calorie Calculator</option>
            </select>
            {calcType === 'bmi' && (
                <>
                    <input type="number" placeholder="Weight (kg)" value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <input type="number" placeholder="Height (cm)" value={value2} onChange={(e) => setValue2(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                </>
            )}
            {calcType === 'calories' && (
                <>
                    <input type="number" placeholder="Weight (kg)" value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <input type="number" placeholder="Height (cm)" value={value2} onChange={(e) => setValue2(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                </>
            )}
            <button onClick={calculate} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Calculate</button>
            {result && <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>{result}</div>}
        </div>
    );
}
export default HealthCalculator;
