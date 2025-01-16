'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddVitalsPage: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [heartRate, setHeartRate] = useState<number | ''>('');
  const [systolic, setSystolic] = useState<number | ''>('');
  const [oxygenSaturation, setOxygenSaturation] = useState<number | ''>('');
  const [respiratoryRate, setRespiratoryRate] = useState<number | ''>('');
  const [temperature, setTemperature] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        room_number: roomNumber,
        heart_rate: heartRate || undefined,
        systolic: systolic || undefined,
        oxygen_saturation: oxygenSaturation || undefined,
        respiratory_rate: respiratoryRate || undefined,
        temperature: temperature || undefined,
      };

      const response = await axios.post('/api/create/addVitals', payload);

      // Success response
      setMessage(response.data.message);
      setError(null);

      // Reset form
      setRoomNumber('');
      setHeartRate('');
      setSystolic('');
      setOxygenSaturation('');
      setRespiratoryRate('');
      setTemperature('');
    } catch (err: any) {
      setMessage(null);
      setError(err.response?.data?.message || 'Failed to add vitals. Try again.');
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center">
      {/* Form Container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Patient Vitals</h2>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Room Number */}
          <div className="mb-4">
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Room Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="roomNumber"
              placeholder="Enter the room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Heart Rate */}
          <div className="mb-4">
            <label
              htmlFor="heartRate"
              className="block text-sm font-medium text-gray-700"
            >
              Heart Rate
            </label>
            <input
              type="number"
              id="heartRate"
              placeholder="Enter heart rate"
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Systolic */}
          <div className="mb-4">
            <label
              htmlFor="systolic"
              className="block text-sm font-medium text-gray-700"
            >
              Systolic Blood Pressure
            </label>
            <input
              type="number"
              id="systolic"
              placeholder="Enter systolic pressure"
              value={systolic}
              onChange={(e) => setSystolic(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Oxygen Saturation */}
          <div className="mb-4">
            <label
              htmlFor="oxygenSaturation"
              className="block text-sm font-medium text-gray-700"
            >
              Oxygen Saturation
            </label>
            <input
              type="number"
              id="oxygenSaturation"
              placeholder="Enter oxygen saturation level"
              value={oxygenSaturation}
              onChange={(e) => setOxygenSaturation(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Respiratory Rate */}
          <div className="mb-4">
            <label
              htmlFor="respiratoryRate"
              className="block text-sm font-medium text-gray-700"
            >
              Respiratory Rate
            </label>
            <input
              type="number"
              id="respiratoryRate"
              placeholder="Enter respiratory rate"
              value={respiratoryRate}
              onChange={(e) => setRespiratoryRate(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Temperature */}
          <div className="mb-4">
            <label
              htmlFor="temperature"
              className="block text-sm font-medium text-gray-700"
            >
              Temperature
            </label>
            <input
              type="number"
              id="temperature"
              placeholder="Enter temperature"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Submit Vitals
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVitalsPage;
