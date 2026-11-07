import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Properties() {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const fetchProperties = async () => {
        try {
            const response = await api.get('properties/');
            const data = response.data.results ? response.data.results : response.data;
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleAddProperty = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('properties/', { 
                name, 
                location, 
                description, 
                landlord: 2 
            });
            setName('');
            setLocation('');
            setDescription('');
            setShowForm(false);
            fetchProperties();
        } catch (err) {
            console.error("Backend Error:", err.response?.data);
            if (err.response && err.response.data) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError('Failed to add property. Check console for details.');
            }
        }
    };

    if (loading) return <div style={{ padding: '30px' }}>Loading properties...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ color: '#2c3e50' }}>Properties</h1>
                    {user?.role === 'ADMIN' && (
                        <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {showForm ? 'Cancel' : '+ Add Property'}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3>Add New Property</h3>
                        {error && <p style={{ color: 'red', background: '#fee', padding: '10px', borderRadius: '4px' }}>{error}</p>}
                        <form onSubmit={handleAddProperty} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <input type="text" placeholder="Property Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }} />
                            <button type="submit" style={{ padding: '10px 20px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                        </form>
                    </div>
                )}

                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '10px' }}>ID</th>
                                <th style={{ padding: '10px' }}>Name</th>
                                <th style={{ padding: '10px' }}>Location</th>
                                <th style={{ padding: '10px' }}>Landlord</th>
                                <th style={{ padding: '10px' }}>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>No properties found.</td></tr>
                            ) : (
                                properties.map((prop) => (
                                    <tr key={prop.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{prop.id}</td>
                                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{prop.name}</td>
                                        <td style={{ padding: '10px' }}>{prop.location}</td>
                                        <td style={{ padding: '10px' }}>{prop.landlord_email}</td>
                                        <td style={{ padding: '10px' }}>{prop.units ? prop.units.length : 0}</td>
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
