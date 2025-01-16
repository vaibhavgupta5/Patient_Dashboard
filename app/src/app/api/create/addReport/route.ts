import connectDB from "@/lib/connectDB";
import PatientModel from "@/Models/Patient";
import ReportModel from "@/Models/Report";
import ReportSchema from "@/Schema/ReportSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawData = await req.json();

  // Convert string dates to Date objects
  const processedData = {
    ...rawData,
    report_date: new Date(rawData.report_date),
    medications_administered: rawData.medications_administered.map((med: any) => ({
      ...med,
      time: new Date(med.time),
    })),
    files: rawData.files.map((file: any) => ({
      ...file,
      upload_date: new Date(file.upload_date),
    })),
  };

  // Validate the processed data using Zod
  const data = ReportSchema.parse(processedData);

  connectDB();

  try {
    const ndata = {
      ...data,
      createdAt: new Date(),
      patient_id: data.patient_id ? new mongoose.Types.ObjectId(data.patient_id) : "",
      nurse_id: data.nurse_id ? new mongoose.Types.ObjectId(data.nurse_id) : "",
    };

    const newReport = new ReportModel(ndata); // Create a new report
    await newReport.save(); // Save to database

    // Find the patient and add the report reference
    const patient = await PatientModel.findById(data.patient_id);
    patient?.reports?.push(newReport._id as any);

    // Save the updated patient document
    await patient?.save();

    return NextResponse.json({
      status: 200,
      body: {
        message: "New Report added successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: {
        message: "Badi Dikat h",
        error: error.message,
      },
    });
  }
}
