import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function Maintenance() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('maintenance/');
                setRequests(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching maintenance:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    if (loading) return <div style={{ padding: '30px' }}>Loading requests...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>Maintenance Requests</h1>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '10px' }}>ID</th>
                                <th style={{ padding: '10px' }}>Title</th>
                                <th style={{ padding: '10px' }}>Priority</th>
                                <th style={{ padding: '10px' }}>Status</th>
                                <th style={{ padding: '10px' }}>Tenant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>No requests found.</td></tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{req.id}</td>
                                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{req.title}</td>
                                        <td style={{ padding: '10px' }}>
                                            <span style={{ padding: '4px 8px', borderRadius: '4px', background: req.priority === 'HIGH' ? '#f8d7da' : '#e2e3e5', color: req.priority === 'HIGH' ? '#721c24' : '#383d41' }}>
                                                {req.priority}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px' }}>{req.status}</td>
                                        <td style={{ padding: '10px' }}>{req.tenant_email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
