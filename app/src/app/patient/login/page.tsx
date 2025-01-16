'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

const PatientLoginPage: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/get/getpatientbyroom', { room_number: roomNumber });
      const { data } = response;

      localStorage.setItem('patientData', JSON.stringify(data.body.data));
      localStorage.setItem('login', 'true');
      setError(null);
      router.push('/patient/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Try again.');
    }
  };

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  };

  return (
    <div className="flex text-black h-screen">
      {/* Left Background Section */}
      <div
  className="flex-1 hidden md:block bg-cover bg-center"
  style={{
    backgroundImage:
      'url(/loginbg.jpg)',
  }}
></div>


      {/* Right Login Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-blue-500">
          <span>CareLink Patient Login</span>
        </div>


        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          {/* Email Field */}
          <div className="mb-4">
           
            <input
              type="text"
              id="roomNumber"
              placeholder="Enter your room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
      
            <div className="relative">
           
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-green-500"
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>

       
          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default PatientLoginPage;
