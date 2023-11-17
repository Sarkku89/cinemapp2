import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/login', { email, password });
      const user = response.data;
      onLogin(user);
      setError(null);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response?.data?.error || 'Unknown error');
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 id="login-title">Login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
