import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../state/useStore';

const PrivateRoute = ({ children, scope }) => {
  const { user } = useStore();

  const hasScope = (requiredScope) => {
    if (user && user.scope) {
      return user.scope.includes('*') || user.scope.includes(requiredScope);
    }
    return false;
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (scope && !hasScope(scope)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
