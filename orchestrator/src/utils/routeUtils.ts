import { useLocation } from 'react-router-dom';

export const useAppRouting = (appName: string) => {
  const location = useLocation();
  const isStandalone = window.location.port === (appName === 'orchestrator' ? '3001' : '3002');
  
  const getInternalPath = () => {
    if (isStandalone) {
      return location.pathname;
    } else {
      // Remove the app prefix: /orchestrator/workflows → /workflows
      const basePath = `/${appName}`;
      return location.pathname.replace(basePath, '') || '/';
    }
  };
  
  const getFullPath = (internalPath: string) => {
    if (isStandalone) {
      return internalPath;
    } else {
      const basePath = `/${appName}`;
      return `${basePath}${internalPath}`;
    }
  };
  
  return {
    isStandalone,
    internalPath: getInternalPath(),
    getFullPath,
    basePath: isStandalone ? '' : `/${appName}`
  };
}; 