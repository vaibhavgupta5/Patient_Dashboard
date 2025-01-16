'use client'

import React from "react";

const DoctorVisits: React.FC = () => {
  const doctors = [
    { name: "Dr. Hector", date: "20/05/2024", department: "Dentist" },
    { name: "Dr. Mitchel", date: "20/05/2024", department: "Urologist" },
    { name: "Dr. Fermin", date: "18/03/2024", department: "Surgeon" },
  ];

  return (
    <div className="card bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Doctor Visits</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 text-sm font-semibold text-gray-600">Doctor</th>
            <th className="text-left p-2 text-sm font-semibold text-gray-600">Date</th>
            <th className="text-left p-2 text-sm font-semibold text-gray-600">Department</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="p-2 text-sm text-gray-700">{doc.name}</td>
              <td className="p-2 text-sm text-gray-700">{doc.date}</td>
              <td className="p-2 text-sm text-gray-700">{doc.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorVisits;
