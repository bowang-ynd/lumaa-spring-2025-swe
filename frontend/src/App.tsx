import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TasksPage from './components/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <div className="container">
              <div className="auth-form">
                <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
                  Switch to {isLogin ? 'Register' : 'Login'}
                </button>
                <AuthForm onAuthSuccess={handleAuthSuccess} isLogin={isLogin} />
              </div>
            </div>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute token={token}>
              <div className="container">
                <div className="tasks-page">
                  <TasksPage token={token} onLogout={handleLogout} />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        {/* Default route redirects based on authentication */}
        <Route
          path="*"
          element={token ? <Navigate to="/tasks" replace /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
