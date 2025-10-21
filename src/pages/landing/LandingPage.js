import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './LandingPage.css';

export default function LandingPage() {
  const { t, lang } = useI18n();
  const { isDark } = useTheme();

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="hero-root">
      {/* Top Navigation */}
      <header className="nav-wrap">
 <div className="logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
  <img 
    src="/AiThor.jpg"  // مسار صحيح للصورة داخل public
    alt="AiThor Logo" 
    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
  />
</div>


        <nav className="nav-center" aria-label="main navigation">
          <ul>
            <li className="active">
              <ScrollLink to="hero-section" smooth={true} duration={500} className="nav-link" offset={-100}>HOME</ScrollLink>
            </li>
            <li>
              <ScrollLink to="about-section" smooth={true} duration={500} className="nav-link" offset={-100}>ABOUT</ScrollLink>
            </li>
            <li>
              <ScrollLink to="products-section" smooth={true} duration={500} className="nav-link" offset={-100}>SERVICES</ScrollLink>
            </li>
            <li className="socials-dropdown">
              <span className="nav-link">SOCIALS</span>
              <div className="social-icons-dropdown">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="social-icon" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="social-icon" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" />
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* Decorative Circuits */}
      <svg className="circuit left1" viewBox="0 0 600 600" preserveAspectRatio="none">
        <g strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 320 L120 260 L200 300 L300 220 L360 260 L560 120" />
        </g>
      </svg>

      <svg className="circuit left2" viewBox="0 0 600 600" preserveAspectRatio="none">
        <g strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 420 L140 360 L220 400 L320 340 L380 360 L520 240" />
        </g>
      </svg>

      <svg className="circuit center" viewBox="0 0 800 400" preserveAspectRatio="none">
        <g strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 200 L120 150 L240 190 L360 140 L480 180 L600 120 L760 60" />
        </g>
      </svg>

      <svg className="circuit right1" viewBox="0 0 600 600" preserveAspectRatio="none">
        <g strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M590 280 L480 360 L400 320 L300 400 L220 360 L40 520" />
        </g>
      </svg>

      <svg className="circuit right2" viewBox="0 0 600 600" preserveAspectRatio="none">
        <g strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M560 220 L460 280 L380 240 L300 320 L220 280 L120 360" />
        </g>
      </svg>

      {/* Hero Section */}
      <main className="container" id="hero-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            <span className="g1">POWER YOUR BUSINESS</span>
            <br />
            <span className="g2">WITH SMART AI SOLUTIONS</span>
          </h1>

          <p className="subtitle">
            AiThor helps companies integrate intelligent automation, data-driven insights, and AI-powered tools to enhance performance and growth.
          </p>

          <div className="ctas">
            <RouterLink to="/register" className="btn primary">GET STARTED</RouterLink>
            <RouterLink to="/dashboard" className="btn outline">TRY DEMO</RouterLink>
          </div>
        </motion.div>
      </main>

      <motion.div
        className="glow g-left"
        animate={{ y: [0, -18, 0], opacity: [0.25, 0, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="glow g-right"
        animate={{ y: [0, 18, 0], opacity: [0.2, 0, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* About Section */}
      <section id="about-section" className="content-section">
        <div className="section-inner">
          <h2 className="section-title">ABOUT AITHOR</h2>
          <p className="section-description">
            AiThor is an intelligent platform that provides AI-driven solutions to empower businesses and startups. Our mission is to make artificial intelligence accessible, practical, and effective for every organization seeking growth and innovation.
          </p>
          <div className="about-grid">
            <div className="about-item">
              <h3>Our Vision</h3>
              <p>To become the leading hub for AI innovation that transforms the digital landscape.</p>
            </div>
            <div className="about-item">
              <h3>Our Mission</h3>
              <p>To simplify AI integration for businesses and help them make smarter decisions powered by data and technology.</p>
            </div>
            <div className="about-item">
              <h3>Our Promise</h3>
              <p>We build tools that merge creativity, intelligence, and automation — all in one ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="products-section" className="content-section">
        <div className="section-inner">
          <h2 className="section-title">OUR SERVICES</h2>
          <p className="section-description">
            AiThor offers a set of intelligent tools and digital services that use artificial intelligence to optimize business processes and improve customer experiences.
          </p>
          <div className="products-grid">
            <div className="product-card">
              <h3>AI Chat Assistant</h3>
              <p>A smart chatbot that provides automated responses, customer support, and data insights in real time.</p>
              <RouterLink to="/register" className="btn outline sm">Learn More</RouterLink>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  );
}
