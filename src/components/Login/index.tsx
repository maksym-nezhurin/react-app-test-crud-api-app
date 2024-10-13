import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  setToken: (token: string) => void;
}

interface IData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post<IData>(`${apiUrl}/api/users/login`, {
        email: username,
        password,
      });
    
      const { accessToken, refreshToken, userId } = response.data;

      // Assuming the response contains a JWT token
      // const token = response.data.token;
      setToken(accessToken);

      // Optionally, store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
    } catch (err) {
      console.log('err', err)
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
