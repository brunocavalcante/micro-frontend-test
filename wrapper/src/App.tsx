import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { AuthenticatedTopbar } from './components/AuthenticatedTopbar';
import './App.css';

// Lazy load the micro-frontends
const OrchestratorApp = React.lazy(() => import('orchestrator/App'));
const TamlyApp = React.lazy(() => import('tamly/App'));

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return <>{children}</>;
};

const LoadingFallback: React.FC<{ appName: string }> = ({ appName }) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading {appName}...</p>
  </div>
);

const Home: React.FC = () => (
  <div className="home-container">
    <div className="hero-section">
      <h1>Welcome to Micro-Frontend Hub</h1>
      <p>Your centralized platform for managing workflows and tasks</p>
    </div>
    
    <div className="app-grid">
      <div className="app-card">
        <div className="app-icon orchestrator-icon">🔄</div>
        <h3>Orchestrator</h3>
        <p>Manage and monitor automated workflows with powerful analytics and real-time tracking.</p>
        <Link to="/orchestrator" className="app-link">Open Orchestrator</Link>
      </div>
      
      <div className="app-card">
        <div className="app-icon tamly-icon">✅</div>
        <h3>Tamly</h3>
        <p>Organize tasks, track projects, and manage your schedule with an intuitive interface.</p>
        <Link to="/tamly" className="app-link">Open Tamly</Link>
      </div>
    </div>
  </div>
);

const Topbar: React.FC = () => {
  const location = useLocation();
  
  const getActiveApp = () => {
    if (location.pathname.startsWith('/orchestrator')) return 'orchestrator';
    if (location.pathname.startsWith('/tamly')) return 'tamly';
    return 'home';
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
          Micro-Frontend Hub
        </Link>
        
        <nav className="nav-links">
          <Link 
            to="/" 
            className={getActiveApp() === 'home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/orchestrator" 
            className={getActiveApp() === 'orchestrator' ? 'nav-link active' : 'nav-link'}
          >
            Orchestrator
          </Link>
          <Link 
            to="/tamly" 
            className={getActiveApp() === 'tamly' ? 'nav-link active' : 'nav-link'}
          >
            Tamly
          </Link>
        </nav>
      </div>
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="app" data-react-router="true">
      <AuthenticatedTopbar />
      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/orchestrator/*" 
              element={
                <Suspense fallback={<LoadingFallback appName="Orchestrator" />}>
                  <OrchestratorApp />
                </Suspense>
              } 
            />
            <Route 
              path="/tamly/*" 
              element={
                <Suspense fallback={<LoadingFallback appName="Tamly" />}>
                  <TamlyApp />
                </Suspense>
              } 
            />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthenticatedApp />
      </Router>
    </AuthProvider>
  );
};

export default App;
