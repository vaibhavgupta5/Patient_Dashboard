import connectDB from "@/lib/connectDB";
import DoctorModel from "@/Models/Doctor";
import NurseModel from "@/Models/Nurses";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB(); // Ensure the database connection is established

  try {
    // Fetch all doctors
    const nurses = await NurseModel.find({}).lean();

    return NextResponse.json({
      status: 200,
      body: {
        message: "Nurses fetched successfully",
        nurses, // Return the list of doctors
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
