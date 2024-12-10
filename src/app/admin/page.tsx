'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminPage = () => {



  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('isLogin') || router.push('/');
  }, [])
  

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-blue-600 text-white py-4 px-6  flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        
      </div>

      {/* Admin Options */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-6 w-full max-w-5xl">
        <div
          onClick={() => handleNavigation('/doctor/chat')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Doctor Chat</h2>
          <p className="text-sm text-gray-600 mt-2">Chat with doctors in real time.</p>
        </div>
        <div
          onClick={() => handleNavigation('/patient/login')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Manage Patients</h2>
          <p className="text-sm text-gray-600 mt-2">View and update patient details.</p>
        </div>
        <div
          onClick={() => handleNavigation('/nurse/addVitals')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Add Vitals</h2>
          <p className="text-sm text-gray-600 mt-2">Add or update patient vitals.</p>
        </div>
        <div
          onClick={() => handleNavigation('/doctor/addNew')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Add Doctors</h2>
          <p className="text-sm text-gray-600 mt-2">Add new doctors to the system.</p>
        </div>
        <div
          onClick={() => handleNavigation('/nurse/addNew')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Add Nurses</h2>
          <p className="text-sm text-gray-600 mt-2">Add new nurses to the system.</p>
        </div>
        <div
          onClick={() => handleNavigation('/patient/addNew')}
          className="bg-white  rounded-md p-6 cursor-pointer hover:bg-blue-50 transition"
        >
          <h2 className="text-lg font-semibold text-blue-600">Add Patients</h2>
          <p className="text-sm text-gray-600 mt-2">Add new patients to the system.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
// gfrfgh