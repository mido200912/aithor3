import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();

  const isActive = (path) =>
    location.pathname === path
      ? { color: '#ff80df', textShadow: '0 0 8px #ff80df' }
      : {};

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0f2c, #2b0033)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            background: 'linear-gradient(90deg, #6a11cb, #ff80df)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: 24,
            whiteSpace: 'nowrap',
          }}
        >
          AiThor
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: 15,
              transition: '0.3s',
              ...isActive('/'),
            }}
          >
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  fontSize: 15,
                  transition: '0.3s',
                  ...isActive('/login'),
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  fontSize: 15,
                  transition: '0.3s',
                  ...isActive('/register'),
                }}
              >
                Register
              </Link>

              <Link
                to="/dashboard"
                style={{
                  background: 'linear-gradient(90deg, #6a11cb, #ff80df)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'opacity 0.3s',
                }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{
                  textDecoration: 'none',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  fontSize: 15,
                  transition: '0.3s',
                  ...isActive('/dashboard'),
                }}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(90deg, #ff0055, #b300ff)',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'opacity 0.3s',
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
