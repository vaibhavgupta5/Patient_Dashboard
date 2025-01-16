'use client';

import React, { useState } from "react";
import axios from "axios";

const AddReport = () => {
  interface UploadedFile {
    name: string;
    url: string;
    upload_date: string;
  }
  
  const [formData, setFormData] = useState<{
    patient_id: string;
    nurse_id: string;
    report_date: string;
    summary: string;
    medications_administered: { name: string; dosage: string; time: string }[];
    files: UploadedFile[];
  }>({
    patient_id: "",
    nurse_id: "",
    report_date: "",
    summary: "",
    medications_administered: [{ name: "", dosage: "", time: "" }],
    files: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  type MedicationField = 'name' | 'dosage' | 'time';

  const handleMedChange = (index: number, field: MedicationField, value: string) => {
    const updatedMedications = [...formData.medications_administered];
    updatedMedications[index][field] = value;
    setFormData({ ...formData, medications_administered: updatedMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications_administered: [...formData.medications_administered, { name: "", dosage: "", time: "" }],
    });
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvxhlfuox/upload`, // Replace `your_cloud_name` with your Cloudinary cloud name
        formData
      );

      setUploading(false);

      return {
        name: response.data.original_filename,
        url: response.data.secure_url,
        upload_date: new Date().toISOString(),
      };
    } catch (err) {
      setUploading(false);
      console.error("Error uploading file:", err);
      throw new Error("Failed to upload file");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const uploadedFile = await uploadFile(e.target.files[0]);
        setFormData({
          ...formData,
          files: [...formData.files, uploadedFile],
        });
      } catch (error) {
        setError("Failed to upload file.");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/reports/add", formData);

      if (response.status === 200) {
        setSuccess("Report added successfully!");
        setFormData({
          patient_id: "",
          nurse_id: "",
          report_date: "",
          summary: "",
          medications_administered: [{ name: "", dosage: "", time: "" }],
          files: [],
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.body?.message || "Failed to add report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-xl font-bold text-blue-600 mb-6">Add New Report</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Patient ID</label>
          <input
            type="text"
            value={formData.patient_id}
            onChange={(e) => handleChange(e, "patient_id")}
            placeholder="Enter Patient ID"
            className="w-full mt-2 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nurse ID</label>
          <input
            type="text"
            value={formData.nurse_id}
            onChange={(e) => handleChange(e, "nurse_id")}
            placeholder="Enter Nurse ID"
            className="w-full mt-2 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Report Date</label>
          <input
            type="date"
            value={formData.report_date}
            onChange={(e) => handleChange(e, "report_date")}
            className="w-full mt-2 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange(e, "summary")}
            placeholder="Write the report summary"
            className="w-full mt-2 px-4 py-2 border rounded-md"
          />
        </div>

        {/* Medications Administered */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Medications Administered</label>
          {formData.medications_administered.map((med, index) => (
            <div key={index} className="mt-4 grid grid-cols-3 gap-4">
              <input
                type="text"
                value={med.name}
                onChange={(e) => handleMedChange(index, "name", e.target.value)}
                placeholder="Medication Name"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                value={med.dosage}
                onChange={(e) => handleMedChange(index, "dosage", e.target.value)}
                placeholder="Dosage"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="datetime-local"
                value={med.time}
                onChange={(e) => handleMedChange(index, "time", e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          ))}
          <button
            onClick={addMedication}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Add Medication
          </button>
        </div>

        {/* Files */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Files</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
          />
          {uploading && <p className="text-sm text-gray-500">Uploading file...</p>}
          <ul className="mt-4">
            {formData.files.map((file, index) => (
              <li key={index} className="text-sm text-blue-600">
                {file.name} - <a href={file.url} target="_blank" rel="noopener noreferrer">View</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>

      {/* Feedback Messages */}
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
  );
};

export default AddReport;
