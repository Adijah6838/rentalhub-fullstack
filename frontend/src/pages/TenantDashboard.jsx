import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function TenantDashboard() {
    return (
        <div style={{ minHeight: '100vh', background: '#f4f4f9' }}>
            <Navbar />
            <div style={{ padding: '30px' }}>
                <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Tenant Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>My Current Rent</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>50,000</p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#7f8c8d', fontSize: '14px' }}>Outstanding Balance</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#e74c3c' }}>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
