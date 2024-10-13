import React, { useState } from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';

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
  const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/users/login` });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = await axiosWrapper.post<IData>(`${apiUrl}/api/users/login`, {
        email: username,
        password,
      });
    
      const { accessToken, refreshToken, userId } = data;

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
