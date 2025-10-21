import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './landing/LandingPage.css'; // استيراد نفس ستايل الصفحة الرئيسية

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/company-setup');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="hero-root">
      <div className="container">
      <div 
  className="card" 
  style={{ 
    maxWidth: '430px',     // زيادة العرض الأقصى
    width: '80%',          // عرض نسبي للشاشة
    padding: '60px',       // زيادة الحشو الداخلي
    margin: 'auto', 
    borderRadius: '18px', 
    backdropFilter: 'blur(6px)', 
    background: 'rgba(15,20,28,0.7)', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
  }}
>
    <h1 className="hero-title" style={{ fontSize: '48px', marginBottom: '20px', background: 'linear-gradient(90deg, #7fc6ff 0%, #ff77c6 100%)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 800 }}>AiThor</h1>
         <p 
  className="subtitle" 
  style={{ 
    textAlign: 'center',      // لتوسيط النص
    margin: '0 0 30px 0',     // مسافة من الأسفل فقط
    color: 'rgba(200,214,232,0.8)' 
  }}
>
  Create a new account
</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="input-field"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="input-field"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input-field"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="input-field"
              />
            </div>

            {error && <div style={{ marginBottom: '15px', color: '#ff77c6', textAlign: 'center' }}>{error}</div>}

            <button type="submit" className="btn primary" style={{ width: '100%' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ marginTop: '25px', textAlign: 'center', color: 'rgba(200,214,232,0.8)' }}>
            Already have an account? <Link to="/login" style={{ color: '#ff77c6', fontWeight: '700' }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
