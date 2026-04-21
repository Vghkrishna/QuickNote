import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Sparkles } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
          <h1 className="hero-tagline">Capture your thoughts instantly.</h1>
          <p className="hero-description">
            The ultimate professional platform to organize your ideas, secure your notes, and sync across all your devices with a stunning glassmorphism interface.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>100%</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Secure & Private</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Fast</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Cloud Syncing</div>
            </div>
          </div>
        </div>
        <img src={heroIllustration} alt="Hero" className="hero-image" />
      </div>

      <div className="form-side">
        <div className="auth-card glass-panel">
          <div className="auth-icon-wrapper">
            <div className="auth-icon">
              <LogIn size={32} color="white" />
            </div>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to QuickNote</p>
          
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="error-msg">{error}</div>}
            
            <button type="submit" className="glass-button" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
