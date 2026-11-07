import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import TenantDashboard from './pages/TenantDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
import Properties from './pages/Properties';
import Maintenance from './pages/Maintenance';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/login" />;
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute allowedRoles={['ADMIN', 'LANDLORD']}><Properties /></ProtectedRoute>} />
            <Route path="/maintenance" element={<ProtectedRoute allowedRoles={['ADMIN', 'LANDLORD', 'TENANT']}><Maintenance /></ProtectedRoute>} />
            <Route path="/landlord-dashboard" element={<ProtectedRoute allowedRoles={['LANDLORD']}><LandlordDashboard /></ProtectedRoute>} />
            <Route path="/tenant-dashboard" element={<ProtectedRoute allowedRoles={['TENANT']}><TenantDashboard /></ProtectedRoute>} />
            <Route path="/maintenance-dashboard" element={<ProtectedRoute allowedRoles={['MAINTENANCE']}><MaintenanceDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
