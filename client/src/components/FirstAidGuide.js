import React, { useState } from 'react';

function FirstAidGuide() {
    const [selected, setSelected] = useState(null);
    const guides = [
        { title: 'CPR', steps: ['Check responsiveness', 'Call emergency', '30 chest compressions', '2 rescue breaths'] },
        { title: 'Burn', steps: ['Cool with running water', 'Cover with sterile cloth', 'Do not apply ice', 'Seek medical help'] },
        { title: 'Fracture', steps: ['Immobilize the area', 'Apply ice pack', 'Do not move', 'Get medical help'] }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? First Aid Guide</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {guides.map(g => (
                    <button key={g.title} onClick={() => setSelected(g)} style={{ padding: '10px 20px', background: selected?.title === g.title ? '#4caf50' : '#ddd', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{g.title}</button>
                ))}
            </div>
            {selected && (
                <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px' }}>
                    <h4>{selected.title}</h4>
                    <ol>{selected.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                </div>
            )}
        </div>
    );
}
export default FirstAidGuide;
