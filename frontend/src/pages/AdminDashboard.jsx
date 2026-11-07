import { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        total_properties: 0,
        total_units: 0,
        occupied_units: 0,
        vacant_units: 0,
        total_tenants: 0,
        open_requests: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('dashboard/summary/');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{ padding: '30px' }}>Loading dashboard data...</div>;

    const occupancyData = {
        labels: ['Occupied', 'Vacant'],
        datasets: [
            {
                data: [stats.occupied_units, stats.vacant_units],
                backgroundColor: ['#2ecc71', '#e67e22'],
                borderWidth: 1,
            },
        ],
    };

    const overviewData = {
        labels: ['Properties', 'Total Units', 'Tenants', 'Open Requests'],
        datasets: [
            {
                label: 'Count',
                data: [stats.total_properties, stats.total_units, stats.total_tenants, stats.open_requests],
                backgroundColor: ['#3498db', '#9b59b6', '#f1c40f', '#e74c3c'],
            },
        ],
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>Admin Dashboard</h1>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>Total Properties</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.total_properties}</p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>Total Units</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.total_units}</p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>Total Tenants</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.total_tenants}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px' }}>Occupancy Rates</h3>
                        <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                            <Doughnut data={occupancyData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px' }}>Platform Overview</h3>
                        <div style={{ height: '250px' }}>
                            <Bar data={overviewData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
