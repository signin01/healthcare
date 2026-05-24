import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

function PrescriptionUpload() {
    const [files, setFiles] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('prescriptions');
        if (saved) setPrescriptions(JSON.parse(saved));
    }, []);

    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })));
        const newPrescriptions = acceptedFiles.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: (file.size / 1024).toFixed(2),
            date: new Date().toLocaleDateString(),
            status: 'Pending'
        }));
        const updated = [...newPrescriptions, ...prescriptions];
        setPrescriptions(updated);
        localStorage.setItem('prescriptions', JSON.stringify(updated));
        toast.success('Prescription uploaded!');
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div style={{ padding: '20px' }}>
            <h3>Upload Prescription</h3>
            <div {...getRootProps()} style={{ border: '2px dashed #4caf50', padding: '40px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', background: '#f9f9f9' }}>
                <input {...getInputProps()} />
                <p>Drag and drop prescription here</p>
                <small>PDF, JPG, PNG (Max 5MB)</small>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>Prescription History</h4>
                {prescriptions.length === 0 ? <p>No prescriptions</p> : prescriptions.map(p => (
                    <div key={p.id} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                        <div><strong>{p.name}</strong><br />{p.date}</div>
                        <div><span style={{ background: '#ff9800', padding: '2px 8px', borderRadius: '20px', color: 'white' }}>{p.status}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PrescriptionUpload;
