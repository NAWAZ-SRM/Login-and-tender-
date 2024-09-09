// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Details() {
  const [username, setUserName] = useState('');
  const [phoneno, setPhoneNo] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/details', { username, phoneno });
      console.log('Login Response:', response.data);

      // Store the userId and token in localStorage
      localStorage.setItem('userId', response.data.chatId);
      localStorage.setItem('token', response.data.token); // Optional if using token

      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUserName(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneno" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <input 
              type="text" 
              id="phoneno" 
              value={phoneno} 
              onChange={(e) => setPhoneNo(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Details;