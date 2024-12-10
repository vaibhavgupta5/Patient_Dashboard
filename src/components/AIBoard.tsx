'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthAnalysis = () => {
  const [vitals, setVitals] = useState({
    heartRate: '',
    systolic: '',
    diastolic: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    temperature: '',
  });
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch vitals based on room number from localStorage
    const fetchVitals = async () => {
        const data = localStorage.getItem("patientData"); // Replace 'keyName' with your key
        if (!data) {
            setError('Room number not found in local storage.');
            return;}
        const patientData = JSON.parse(data);
        const { room_number } = patientData;



      try {
        const response = await axios.post('/api/get/getpatientbyroom', {
            room_number
        });

        const patientData = response.data.body.data;
        const latestVitals = patientData.health_metrics[patientData.health_metrics.length - 1];

        setVitals({
          heartRate: latestVitals.heart_rate || '',
          systolic: latestVitals.blood_pressure.systolic || '',
          diastolic: latestVitals.blood_pressure.diastolic || '',
          oxygenSaturation: latestVitals.oxygen_saturation || '',
          respiratoryRate: latestVitals.respiratory_rate || '',
          temperature: latestVitals.temperature || '',
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching vitals data.');
      }
    };

    fetchVitals();
  }, []);

  const handleAnalysis = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await axios.post('/api/health-analysis', {
        vitals,
      });

      setAnalysis(response.data.result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error analyzing health vitals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white overflow-y-scroll p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Health Vitals Analysis
      </h1>

      {/* Vitals Display */}
      <div className="grid grid-cols-2  gap-4 mb-6">
        {Object.entries(vitals).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-sm font-medium text-gray-600 mb-2">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              id={key}
              value={value}
              disabled
              className="p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalysis}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Vitals'}
      </button>

      {/* Results Section */}
      <div className="mt-6">
        {analysis && (
          <div className="p-4 overflow-y-scroll bg-green-100 text-green-700 rounded-md">
            <h2 className="font-bold mb-2">Analysis Result:</h2>
            <p>{analysis}</p>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAnalysis;

// Endoffile