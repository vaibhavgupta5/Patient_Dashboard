'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddNursePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact_number: '',
    shift: '',
  });


  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('isLogin') || router.push('/');
  }, [])

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/create/addNurse', formData);
      setSuccess(response.data.body.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        contact_number: '',
        shift: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.body?.message || 'Failed to add nurse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex text-black h-screen">
      {/* Left Background Section */}
      <div
        className="flex-1 hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your actual image
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto bg-white shadow-md ">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Add New Nurse</h2>

        {/* Error or Success Message */}
        {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Nurse's Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password (Min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Contact Number Field */}
          <div className="mb-4">
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Shift Field */}
          <div className="mb-4">
            <input
              type="text"
              name="shift"
              placeholder="Shift (e.g., Morning, Night)"
              value={formData.shift}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Nurse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNursePage;
