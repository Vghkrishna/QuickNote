import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Auth Route wrapper (redirects to dashboard if already logged in)
const AuthRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
