import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Don't show navbar if not logged in

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <BookOpen size={28} style={{ color: 'var(--accent-color)' }} />
        <span>QuickNote</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>
            {user?.email ? user.email.split('@')[0] : 'User'}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            Personal Cloud
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="glass-button secondary" 
          style={{ padding: '10px 18px', fontSize: '0.85rem' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
