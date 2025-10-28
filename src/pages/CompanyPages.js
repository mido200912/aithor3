import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyPages = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب الشركات العامة بدون apiKey
  const apiUrl = 'https://aithor-cw06qvmu.b4a.run/api/public/companies/public';

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.success) setCompanies(data.companies || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px', color: '#e6eef8' }}>Loading companies...</p>;

  return (
    <div style={{ minHeight: '100vh', background: '#0b1117', padding: '40px', color: '#e6eef8' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', fontWeight: '700', color: '#667eea' }}>
        Partner Companies
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {companies.map((company) => (
          <div
            key={company._id}
            style={{
              background: 'rgba(15,20,28,0.7)',
              padding: '20px',
              borderRadius: '18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {company.logo && (
              <img
                src={company.logo}
                alt={company.name}
                style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '15px', borderRadius: '12px' }}
              />
            )}
            <h2 style={{ marginBottom: '10px', color: '#ff77c6' }}>{company.name}</h2>
            <p style={{ flex: 1 }}>{company.description}</p>
            <Link
              to={`/company-chat/${company._id}`}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: '#667eea',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Open Chat
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPages;
