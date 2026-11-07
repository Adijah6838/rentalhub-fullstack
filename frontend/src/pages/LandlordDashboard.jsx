import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function LandlordDashboard() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        api.get('properties/').then(res => setProperties(res.data.results || res.data));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Landlord Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>My Properties</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{properties.length}</p>
                    </div>
                </div>
                <div style={{ background: 'white', padding: '20px', marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>My Properties List</h3>
                    <ul>
                        {properties.map(p => <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>{p.name} - {p.location}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
