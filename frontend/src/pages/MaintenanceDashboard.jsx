import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function MaintenanceDashboard() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        api.get('maintenance/').then(res => setRequests(res.data.results || res.data));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Worker Dashboard</h1>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Assigned Tasks</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Task</th>
                                <th style={{ padding: '10px' }}>Priority</th>
                                <th style={{ padding: '10px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(r => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{r.title}</td>
                                    <td style={{ padding: '10px' }}>{r.priority}</td>
                                    <td style={{ padding: '10px' }}>{r.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
