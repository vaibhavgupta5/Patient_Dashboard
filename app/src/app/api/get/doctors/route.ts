import connectDB from "@/lib/connectDB";
import DoctorModel from "@/Models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB(); // Ensure the database connection is established

  try {
    // Fetch all doctors
    const doctors = await DoctorModel.find({}, { name: 1, specialization: 1 }).lean();

    return NextResponse.json({
      status: 200,
      body: {
        message: "Doctors fetched successfully",
        doctors, // Return the list of doctors
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: {
        message: "Failed to fetch doctors",
        error: error.message,
      },
    });
  }
}
