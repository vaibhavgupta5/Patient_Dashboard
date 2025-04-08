'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [pass, setPass] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pass === 'admin123') {
      localStorage.setItem('isLogin', 'true');
      router.push('/admin');
      
      
    }
    else {
      setError('Incorrect Password');
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
      'url("https://images.unsplash.com/photo-1524758870432-af57e54afa26?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  }}
></div>


      {/* Right Login Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto bg-white  rounded-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-blue-500">
          <span>CareLink Admin Login</span>
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
              type="password"
              id="roomNumber"
              placeholder="Enter the Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>Password is : admin123</div>

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

export default AdminLoginPage;
