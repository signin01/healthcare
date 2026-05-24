import React, { useState } from 'react';

function InsurancePlans() {
    const [plans] = useState([
        { id: 1, name: 'Basic Health', coverage: '?3 Lakhs', premium: '?300/month', features: ['Cashless hospitalization', 'OPD coverage'] },
        { id: 2, name: 'Family Floater', coverage: '?10 Lakhs', premium: '?800/month', features: ['Covers whole family', 'Maternity benefits'] },
        { id: 3, name: 'Senior Citizen', coverage: '?5 Lakhs', premium: '?600/month', features: ['No age limit', 'Pre-existing coverage'] }
    ]);

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Health Insurance Plans</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {plans.map(plan => (
                    <div key={plan.id} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <h3>{plan.name}</h3>
                        <p><strong>Coverage:</strong> {plan.coverage}</p>
                        <p><strong>Premium:</strong> {plan.premium}</p>
                        <ul>{plan.features.map(f => <li key={f}>{f}</li>)}</ul>
                        <button style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default InsurancePlans;
