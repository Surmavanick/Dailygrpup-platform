import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './styles.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Competitors from './components/Competitors';

// Layout Component with Sidebar
function Layout({ children, onLogout }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/sources', label: 'Source Monitor', icon: '📡' },
    { path: '/reports', label: 'Generated Reports', icon: '📑' },
    { path: '/competitors', label: 'Competitor Intel', icon: '🕵️' }
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-circle">P</div>
          <span className="logo-text">Platform</span>
        </div>

        <div className="nav-section-label">Analytics</div>
        <nav className="nav-menu">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path === '/sources' || item.path === '/reports' ? '/' : item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-section-label">Market</div>
        <nav className="nav-menu">
          <Link
            to="/competitors"
            className={`nav-link ${location.pathname === '/competitors' ? 'active' : ''}`}
          >
            <span className="nav-icon">🕵️</span>
            Competitor Intel
          </Link>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button
            className="nav-link"
            onClick={onLogout}
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <span className="nav-icon">🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

// Protected Route wrapper
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter basename="/Dailygrup-platform">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/competitors"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <Competitors />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
