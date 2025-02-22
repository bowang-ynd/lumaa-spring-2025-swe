import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

interface AuthFormProps {
  onAuthSuccess: (token: string) => void;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess, isLogin = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiCall = isLogin ? loginUser : registerUser;
      const result = await apiCall(username, password);

      if (result.token) {
        localStorage.setItem('token', result.token); // store JWT upon successful login
        onAuthSuccess(result.token);
        navigate('/tasks');
      } else {
        alert(result.message || 'Error occurred');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during authentication');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div>
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
