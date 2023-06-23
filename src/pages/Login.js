// Login.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem('user')) {
          // navigate('/', {user_id : });
          navigate('/profile');
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response);
      if (response.status==200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(":-",response.status);
        // console.log(":-----",localStorage.getItem('user'));
        navigate('/profile');
    }
    } catch (error) {
      console.error('Failed to login:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
