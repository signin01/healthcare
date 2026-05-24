import React, { useState } from 'react';

function NearbyHospitals() {
    const [hospitals] = useState([
        { name: 'Apollo Hospital', distance: '2.5 km', rating: 4.8, phone: '1800-123-4567' },
        { name: 'Fortis Hospital', distance: '3.2 km', rating: 4.7, phone: '1800-123-4568' },
        { name: 'AIIMS', distance: '5.1 km', rating: 4.9, phone: '1800-123-4569' }
    ]);

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Nearby Hospitals</h3>
            {hospitals.map(h => (
                <div key={h.name} style={{ background: '#f5f5f5', padding: '15px', marginBottom: '15px', borderRadius: '10px' }}>
                    <strong>{h.name}</strong><br />?? {h.distance} ? ? {h.rating}<br />?? {h.phone}
                </div>
            ))}
        </div>
    );
}
export default NearbyHospitals;
