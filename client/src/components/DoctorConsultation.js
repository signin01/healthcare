import React, { useState } from 'react';
import toast from 'react-hot-toast';

function DoctorConsultation() {
    const [doctors] = useState([
        { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', fee: 800 },
        { id: 2, name: 'Dr. Priya Sharma', specialty: 'Dermatologist', experience: '10 years', fee: 700 },
        { id: 3, name: 'Dr. Amit Patel', specialty: 'General Physician', experience: '8 years', fee: 500 },
        { id: 4, name: 'Dr. Sneha Reddy', specialty: 'Pediatrician', experience: '12 years', fee: 750 }
    ]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const bookAppointment = () => {
        if (!selectedDoctor || !date || !time) { toast.error('Select doctor and time'); return; }
        toast.success(`Appointment booked with ${selectedDoctor.name} on ${date} at ${time}`);
        setSelectedDoctor(null); setDate(''); setTime('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Book Doctor Consultation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {doctors.map(doc => (
                    <div key={doc.id} onClick={() => setSelectedDoctor(doc)} style={{ padding: '15px', background: selectedDoctor?.id === doc.id ? '#e8f5e9' : 'white', borderRadius: '10px', border: selectedDoctor?.id === doc.id ? '2px solid #4caf50' : '1px solid #ddd', cursor: 'pointer' }}>
                        <strong>{doc.name}</strong><br />{doc.specialty}<br />{doc.experience}<br />Rs.{doc.fee}
                    </div>
                ))}
            </div>
            {selectedDoctor && (
                <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                    <h4>Book with {selectedDoctor.name}</h4>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <button onClick={bookAppointment} style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Book Appointment</button>
                </div>
            )}
        </div>
    );
}
export default DoctorConsultation;
