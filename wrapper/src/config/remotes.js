const remoteConfig = {
  development: {
    orchestrator: 'http://localhost:3001',
    tamly: 'http://localhost:3002'
  },
  production: {
    orchestrator: process.env.REACT_APP_ORCHESTRATOR_URL || 'https://your-orchestrator-app.vercel.app',
    tamly: process.env.REACT_APP_TAMLY_URL || 'https://your-tamly-app.vercel.app'
  }
};

const environment = process.env.NODE_ENV || 'development';

export const REMOTE_URLS = remoteConfig[environment];

export default REMOTE_URLS; 