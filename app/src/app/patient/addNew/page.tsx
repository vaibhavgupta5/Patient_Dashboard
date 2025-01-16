'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatientPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male', // Default to 'Male'
    contact_phone: '',
    contact_email: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_relation: '',
    emergency_contact_phone: '',
    room_number: '',
    assigned_doctor: '',
    assigned_nurse: '',
    heart_rate: '',
    systolic: '',
    diastolic: '',
    oxygen_saturation: '',
    respiratory_rate: '',
    temperature: '',
  });

  const [doctors, setDoctors] = useState<any[]>([]); // List of doctors
  const [nurses, setNurses] = useState<any[]>([]); // List of nurses
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch existing doctors and nurses
    const fetchData = async () => {
      try {
        const doctorsResponse = await axios.get('/api/get/doctors');
        const nursesResponse = await axios.get('/api/get/nurses');
        setDoctors(doctorsResponse.data.body.doctors);
        setNurses(nursesResponse.data.body.nurses);
      } catch (err) {
        setError('Failed to fetch doctors and nurses');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {

        const payload = {
            ...formData,
            age: parseInt(formData.age, 10),
            contact: {
              phone: formData.contact_phone,
              email: formData.contact_email,
            },
            emergency_contact: {
              name: formData.emergency_contact_name,
              relation: formData.emergency_contact_relation,
              phone: formData.emergency_contact_phone,
            },
            heart_rate: parseFloat(formData.heart_rate),
            systolic: parseFloat(formData.systolic),
            diastolic: parseFloat(formData.diastolic),
            oxygen_saturation: parseFloat(formData.oxygen_saturation),
            respiratory_rate: parseFloat(formData.respiratory_rate),
            temperature: parseFloat(formData.temperature),
          };

      const response = await axios.post('/api/create/addPatient', payload);

      setSuccess(response.data.body.message);
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        contact_phone: '',
        contact_email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_relation: '',
        emergency_contact_phone: '',
        room_number: '',
        assigned_doctor: '',
        assigned_nurse: '',
        heart_rate: '',
        systolic: '',
        diastolic: '',
        oxygen_saturation: '',
        respiratory_rate: '',
        temperature: '',
      });
      console.log(formData)
    } catch (err: any) {
      setError(err.response?.data?.body?.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto text-black">
      {/* Left Background Section */}
      <div
  className="hidden md:block flex-1 bg-cover bg-center"
  style={{
    backgroundImage: 'url(/pbg.jpg)', // Replace with your actual image path
    backgroundAttachment: 'fixed', // Ensures the image stays fixed on scroll
    backgroundRepeat: 'no-repeat', // Ensures the image doesn't repeat
    backgroundSize: 'cover', // Ensures the image covers the container
  }}
></div>


      {/* Right Form Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-[40%] p-6 mx-auto bg-white shadow-md ">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Add New Patient</h2>

        {/* Error or Success Message */}
        {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Name and Age */}
          <input
            type="text"
            name="name"
            placeholder="Patient's Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Contact Information */}
          <input
            type="text"
            name="contact_phone"
            placeholder="Contact Phone"
            value={formData.contact_phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            name="contact_email"
            placeholder="Contact Email"
            value={formData.contact_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Emergency Contact */}
          <input
            type="text"
            name="emergency_contact_name"
            placeholder="Emergency Contact Name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="emergency_contact_relation"
            placeholder="Relation"
            value={formData.emergency_contact_relation}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="emergency_contact_phone"
            placeholder="Emergency Contact Phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Room and Doctor/Nurse Assignments */}
          <input
            type="text"
            name="room_number"
            placeholder="Room Number"
            value={formData.room_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <select
            name="assigned_doctor"
            value={formData.assigned_doctor}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Assign Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
          <select
            name="assigned_nurse"
            value={formData.assigned_nurse}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Assign Nurse</option>
            {nurses.map((nurse) => (
              <option key={nurse._id} value={nurse._id}>
                {nurse.name} (Shift: {nurse.shift})
              </option>
            ))}
          </select>

          {/* Vital Signs */}
          <input
            type="number"
            name="heart_rate"
            placeholder="Heart Rate"
            value={formData.heart_rate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="systolic"
            placeholder="Systolic BP"
            value={formData.systolic}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="diastolic"
            placeholder="Diastolic BP"
            value={formData.diastolic}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="oxygen_saturation"
            placeholder="Oxygen Saturation"
            value={formData.oxygen_saturation}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="respiratory_rate"
            placeholder="Respiratory Rate"
            value={formData.respiratory_rate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Patient'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatientPage;
