import React from 'react';
import { Link } from 'react-router-dom';
import { useAppRouting } from '../utils/routeUtils';

interface AppLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, children, className }) => {
  const { getFullPath } = useAppRouting('tamly');
  
  return (
    <Link to={getFullPath(to)} className={className}>
      {children}
    </Link>
  );
}; 