import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#2c3e50', color: 'white' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>RentalHub</h2>
                <Link to={user?.role === 'ADMIN' ? '/admin-dashboard' : user?.role === 'LANDLORD' ? '/landlord-dashboard' : user?.role === 'TENANT' ? '/tenant-dashboard' : '/maintenance-dashboard'} style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                {(user?.role === 'ADMIN' || user?.role === 'LANDLORD') && (
                    <Link to="/properties" style={{ color: 'white', textDecoration: 'none' }}>Properties</Link>
                )}
                <Link to="/maintenance" style={{ color: 'white', textDecoration: 'none' }}>Maintenance</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span>Welcome, {user?.first_name || user?.email}</span>
                <span style={{ background: '#34495e', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}>
                    {user?.role}
                </span>
                <button 
                    onClick={logout} 
                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
