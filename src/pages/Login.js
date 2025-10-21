import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './landing/LandingPage.css'; // استخدم نفس استايل الصفحة الرئيسية

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/Dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="hero-root" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
      {/* Optional background glows */}
      <div className="glow g-left"></div>
      <div className="glow g-right"></div>

      <div className="card" style={{
        background: 'rgba(15, 20, 28, 0.8)',
        border: '1px solid rgba(70, 70, 80, 0.3)',
        borderRadius: '18px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(6px)',
      }}>
        <div className="text-center mb-20">
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            background: 'linear-gradient(90deg, #7877c6 0%, #ff77c6 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '10px',
          }}>
            AiThor
          </h1>
          <p style={{ color: 'rgba(200, 214, 232, 0.9)' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(200, 214, 232, 0.9)', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '12px',
                border: '1px solid rgba(70, 70, 80, 0.3)',
                background: 'rgba(15, 20, 28, 0.6)',
                color: '#e6eef8',
                marginTop: '8px',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(200, 214, 232, 0.9)', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '12px',
                border: '1px solid rgba(70, 70, 80, 0.3)',
                background: 'rgba(15, 20, 28, 0.6)',
                color: '#e6eef8',
                marginTop: '8px',
              }}
            />
          </div>

          {error && <div style={{ color: '#ff77c6', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

          <button
            type="submit"
            className="btn primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p style={{ color: 'rgba(200, 214, 232, 0.8)' }}>
            Don’t have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#ff77c6', 
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
