import React from 'react';
import './App.css';

import { AuthProvider } from './hooks/auth';
import Routes from './navigation/routes';

const App:React.FC = () => {
  return (
    <AuthProvider>
      <Routes /> 
    </AuthProvider>
  );
}

export default App;
