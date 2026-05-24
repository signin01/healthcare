import React, { useState } from 'react';

function WellnessBlog() {
    const [posts] = useState([
        { title: '10 Tips for Healthy Living', date: 'May 24, 2024', excerpt: 'Simple habits that transform your health...', author: 'Dr. Rajesh' },
        { title: 'Benefits of Meditation', date: 'May 23, 2024', excerpt: 'How meditation changes your brain...', author: 'Dr. Priya' },
        { title: 'Nutrition Guide', date: 'May 22, 2024', excerpt: 'What to eat for optimal health...', author: 'Nutritionist Anjali' }
    ]);

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Wellness Blog</h3>
            {posts.map(p => (
                <div key={p.title} style={{ background: 'white', padding: '20px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h4>{p.title}</h4>
                    <small>By {p.author} | {p.date}</small>
                    <p>{p.excerpt}</p>
                    <button style={{ background: 'none', border: 'none', color: '#4caf50', cursor: 'pointer', fontWeight: 'bold' }}>Read More ?</button>
                </div>
            ))}
        </div>
    );
}
export default WellnessBlog;
