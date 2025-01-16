'use client';
import axios from "axios";
import { Phone, User } from "lucide-react";
import { useEffect, useState } from "react";

const EmergencyContact = () => {
  const [storedData, setStoredData] = useState<any>(null);
  const [doctorNumber, setDoctorNumber] = useState<string | null>(null);
  const [nurseNumber, setNurseNumber] = useState<string | null>(null);

  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem("patientData");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setStoredData(parsedData);

        // Fetch doctor and nurse contact numbers
        getNurseAndDoctor(parsedData.assigned_doctor, parsedData.assigned_nurse);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []); // Runs once on component mount

  const getNurseAndDoctor = async (doctorId: string, nurseId: string) => {
    try {
      // Fetch doctor contact number
      const responseD = await axios.post("/api/get/doctorbyid", { id: doctorId });

      console.log(responseD)

    //   const responseN = await axios.post("/api/get/nursebyid", { id: nurseId });

      // Set contact numbers
      setDoctorNumber(responseD.data?.data?.contact_number || null);
    //   setNurseNumber(responseN.data?.data?.contact_number || null);
      console.log(responseD.data?.data?.contact_number)
    } catch (error) {
      console.error("Error fetching nurse/doctor data:", error);
    }
  };

  // Default emergencyData in case storedData is not available
  const emergencyData = {
    contactName: storedData?.emergency_contact?.name || "John Doe",
    contactNumber: storedData?.emergency_contact?.phone || "098-765-4321",
    relation: storedData?.emergency_contact?.relation || "Spouse",
    doctorNumber: doctorNumber || "123-56-7890",
    nurseNumber: nurseNumber || "987-654-3210",
  };

  return (
    <div className="max-w-4xl text-black mx-auto bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Relation</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
              <User className="text-blue-500" size={20} />
              <span>{emergencyData.contactName}</span>
            </td>
            <td className="border border-gray-200 px-4 py-2">{emergencyData.relation}</td>
            <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
              <Phone className="text-blue-500" size={20} />
              <a
                href={`tel:${emergencyData.contactNumber}`}
                className="text-blue-600 hover:underline"
              >
                {emergencyData.contactNumber}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-auto mt-6 w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2">Doctor</td>
            <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
              <Phone className="text-blue-500" size={20} />
              <a
                href={`tel:${emergencyData.doctorNumber}`}
                className="text-blue-600 hover:underline"
              >
                {emergencyData.doctorNumber}
              </a>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2">Nurse</td>
            <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
              <Phone className="text-blue-500" size={20} />
              <a
                href={`tel:${emergencyData.nurseNumber}`}
                className="text-blue-600 hover:underline"
              >
                {emergencyData.nurseNumber}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyContact;
