import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('auth/login/', { email, password });
            const { access, refresh, user } = response.data;
            
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user', JSON.stringify(user));
            
            setUser(user);
            
            if (user.role === 'ADMIN') navigate('/admin-dashboard');
            else if (user.role === 'LANDLORD') navigate('/landlord-dashboard');
            else if (user.role === 'TENANT') navigate('/tenant-dashboard');
            else if (user.role === 'MAINTENANCE') navigate('/maintenance-dashboard');
            
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Invalid email or password.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
