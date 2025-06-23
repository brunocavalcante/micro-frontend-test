import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAppRouting } from './utils/routeUtils';
import { AppLink } from './components/AppLink';
import { Analytics } from './components/Analytics';
import './App.css';

const Dashboard: React.FC = () => (
  <div className="orchestrator-page">
    <h2>Orchestrator Dashboard</h2>
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>Active Workflows</h3>
        <div className="metric">12</div>
      </div>
      <div className="dashboard-card">
        <h3>Completed Tasks</h3>
        <div className="metric">847</div>
      </div>
      <div className="dashboard-card">
        <h3>Running Processes</h3>
        <div className="metric">5</div>
      </div>
    </div>
  </div>
);

const Workflows: React.FC = () => (
  <div className="orchestrator-page">
    <h2>Workflow Management</h2>
    <p>Manage and monitor your automated workflows here.</p>
    <div className="workflow-list">
      <div className="workflow-item">
        <div>
          <h4>Data Processing Pipeline</h4>
          <p>Status: Running</p>
        </div>
        <div className="workflow-actions">
          <button>View Details</button>
          <button>Stop</button>
        </div>
      </div>
      <div className="workflow-item">
        <div>
          <h4>Email Campaign Automation</h4>
          <p>Status: Scheduled</p>
        </div>
        <div className="workflow-actions">
          <button>View Details</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { internalPath } = useAppRouting('orchestrator');
  
  return (
    <div className="orchestrator-app">
      <div className="orchestrator-nav">
        <h3>Orchestrator</h3>
        <nav>
          <AppLink to="/" className={internalPath === '/' ? 'nav-active' : ''}>
            Dashboard
          </AppLink>
          <AppLink to="/workflows" className={internalPath === '/workflows' ? 'nav-active' : ''}>
            Workflows
          </AppLink>
          <AppLink to="/analytics" className={internalPath === '/analytics' ? 'nav-active' : ''}>
            Analytics
          </AppLink>
        </nav>
      </div>
      <div className="orchestrator-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Detect if we're running standalone or as part of micro-frontend
  // Standalone: either localhost:3001 or not loaded via Module Federation
  const isStandalone = window.location.port === '3001' || 
                      !window.location.pathname.startsWith('/orchestrator') ||
                      !document.querySelector('[data-react-router]');

  // If standalone, wrap with BrowserRouter, otherwise just return content
  if (isStandalone) {
    return (
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );
  }

  return <AppContent />;
};

export default App;
