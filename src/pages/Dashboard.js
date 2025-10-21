import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { companyService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProjectManagement from './ProjectManagement'; // Assuming these components exist
import ChatInterface from './ChatInterface';
import CompanyDashboard from './CompanyDashboard';
import CompanySetup from './CompanySetup';
// Dashboard.jsx
// تأكد أن المسار صحيح بالنسبة لمكان الملف

import './Dashboard.css';
// Make sure you have Font Awesome installed or linked in your index.html/public/index.html
// e.g., <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">


const Dashboard = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const companyData = await companyService.getCompany();
      setCompany(companyData);
      // If company setup is not complete, set error
      if (!companyData || !companyData.name) {
          setError('Company data not found. Please complete company setup first.');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Company data not found. Please complete company setup first.');
      } else {
        console.error("Failed to fetch company data:", error);
        setError('An error occurred while loading company data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Determine wrapper class based on sidebar state for mobile
  const dashboardWrapperClasses = `dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`;

  return (
    <div className={dashboardWrapperClasses}>
      {/* Hamburger icon for mobile - d-lg-none hides on large screens via CSS */}
      <button className="menu-toggle d-lg-none" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
          {/* Close button for mobile sidebar - d-lg-none hides on large screens via CSS */}
          <button className="close-sidebar d-lg-none" onClick={toggleSidebar}>&times;</button>
        </div>
        <nav className="sidebar-nav-links">
          {[
            { key: 'overview', label: 'Overview', icon: 'fas fa-chart-pie' },
            { key: 'company', label: 'Company Data', icon: 'fas fa-building' },
            { key: 'requests', label: 'Customer Requests', icon: 'fas fa-envelope-open-text' },
            { key: 'chat', label: 'Chat', icon: 'fas fa-comments' },
            { key: 'company-dashboard', label: 'AI Dashboard', icon: 'fas fa-robot' },
            { key: 'api', label: 'API Key', icon: 'fas fa-key' },
            // أضف تبويب جديد في sidebar


          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`btn ${
                activeTab === tab.key ? 'btn-sidebar-primary' : 'btn-sidebar-secondary'
              }`}
            >
              <i className={tab.icon}></i> <span>{tab.label}</span>
            </button>
          ))}
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="btn btn-sidebar-secondary"
            style={{ marginTop: 'auto' }} // Pushes logout button to the bottom
          >
            <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* === Main Content Area === */}
      <main className="dashboard-main-content">
        <div className="dashboard-content container">
          {error ? (
            <div className="card text-center error-message">
              <h2 style={{ color: 'inherit', marginBottom: '20px' }}>Error</h2>
              <p style={{ color: 'inherit', marginBottom: '20px' }}>{error}</p>
              <button onClick={() => navigate('/company-setup')} className="btn btn-primary">
                Setup Company
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="grid grid-3">
                  <InfoCard title="Company Name" value={company?.name || 'Undefined'} />
                  <InfoCard title="Industry" value={company?.industry || 'Undefined'} />
                  <InfoCard title="Total Requests" value={company?.requests?.length || 0} />
                  {/* Additional info cards for overview */}
                  <InfoCard title="Vision" value={company?.vision || 'Undefined'} />
                  <InfoCard title="Mission" value={company?.mission || 'Undefined'} />
                  <InfoCard title="Company Size" value={company?.size || 'Undefined'} />
                </div>
              )}
              {activeTab === 'company' && (
                <CompanyInfo company={company} onUpdate={fetchCompanyData} />
              )}
              {activeTab === 'requests' && (
                <CustomerRequests company={company} onUpdate={fetchCompanyData} />
              )}
              {activeTab === 'chat' && <ChatInterface />}
              {activeTab === 'company-dashboard' && <CompanyDashboard />}
              {activeTab === 'api' && <ApiKeyInfo company={company} />}
              {/* Optional: Add ProjectManagement or other components if needed */}
              {/* {activeTab === 'projects' && <ProjectManagement />} */}
            

            </>
          )}
        </div>
      </main>
    </div>
  );
};

/* === Helper Components === */
const InfoCard = ({ title, value }) => (
  <div className="card text-center">
    <h3>{title}</h3>
    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{value}</p>
  </div>
);
const CompanyInfo = ({ company, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    description: company?.description || '',
    industry: company?.industry || '',
    size: company?.size || '',
    vision: company?.vision || '',
    mission: company?.mission || '',
    values: company?.values || [],
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      name: company?.name || '',
      description: company?.description || '',
      industry: company?.industry || '',
      size: company?.size || '',
      vision: company?.vision || '',
      mission: company?.mission || '',
      values: company?.values || [],
    });
  }, [company]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await companyService.updateCompany(formData);
      onUpdate();
      alert('Company data saved successfully!');
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Failed to save company data.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card">
      <h2>Company Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="form-input"
          />
        </div>
        {/* Added more fields from formData for completeness */}
        <div className="form-group">
          <label className="form-label">Vision</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            rows="2"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mission</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            rows="2"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Company Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        {/* You might need a more complex input for 'values' array */}
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};
const CustomerRequests = ({ company, onUpdate }) => {
  const [requests, setRequests] = useState(company?.requests || []);
  const [loadingDeletion, setLoadingDeletion] = useState(false);

  useEffect(() => {
    if (company?.requests) {
      setRequests(company.requests);
    }
  }, [company?.requests]);

  const handleDeleteRequest = async (index) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    setLoadingDeletion(true);
    try {
      // Assuming deleteRequest takes company ID and request index/ID
      await companyService.deleteRequest(company?._id, index); // Assuming company ID is needed
      setRequests(requests.filter((_, i) => i !== index));
      onUpdate();
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Failed to delete request.');
    } finally {
      setLoadingDeletion(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>Customer Requests</h2>
      {requests.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', padding: '40px' }}>
          No requests currently
        </p>
      ) : (
        requests.map((req, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-color-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <h4>{req.customerName}</h4>
            <p><strong>Product:</strong> {req.product}</p>
            <p><strong>Message:</strong> {req.message}</p>
            <button
              onClick={() => handleDeleteRequest(i)}
              className="btn btn-secondary"
              disabled={loadingDeletion}
              style={{ alignSelf: 'flex-end', marginTop: '10px' }}
            >
              {loadingDeletion ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};
const ApiKeyInfo = ({ company }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(company?.apiKey || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>API Key</h2>
      <div style={{ marginBottom: '20px' }}>
        <label className="form-label">Your Company's API Key</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" className="form-input" value={company?.apiKey || ''} readOnly />
          <button onClick={copyToClipboard} className="btn btn-secondary">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;