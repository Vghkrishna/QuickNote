import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Sparkles } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="split-container">
      <div className="hero-side">
        <div className="hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-color)', marginBottom: '32px' }}>
            <Sparkles size={24} />
            <span style={{ fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.9rem' }}>QUICKNOTE CLOUD</span>
          </div>
          <h1 className="hero-tagline">Start your organized journey today.</h1>
          <p className="hero-description">
            Create your account to unlock professional-grade note taking, beautiful organizing tools, and instant cloud synchronization across your digital life.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Free</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>For Everyone</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Infinite</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Note Storage</div>
            </div>
          </div>
        </div>
        <img src={heroIllustration} alt="Hero" className="hero-image" />
      </div>

      <div className="form-side">
        <div className="auth-card glass-panel">
          <div className="auth-icon-wrapper">
            <div className="auth-icon">
              <UserPlus size={32} color="white" />
            </div>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join QuickNote to save your ideas</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <input 
                type="email" 
                className="glass-input" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                className="glass-input" 
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <div>
              <input 
                type="password" 
                className="glass-input" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            
            {error && <div className="error-msg">{error}</div>}
            
            <button type="submit" className="glass-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
