import connectDB from "@/lib/connectDB";
import DoctorModel from "@/Models/Doctor";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for request body
const getDoctor = z.object({
  id: z.string().min(1, "Doctor ID is required"),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const { id } = getDoctor.parse(await req.json());

    // Ensure the database is connected
    await connectDB();

    // Log the doctor ID for debugging
    console.log("Doctor ID:", id);

    // Query the doctor by ID
    const doctor = await DoctorModel.findById(id);

    // Log the result of the query
    console.log("Doctor:", doctor);

    // Handle case where doctor is not found
    if (!doctor) {
      return NextResponse.json(
        {
          message: "Doctor not found",
        },
        { status: 400 }
      );
    }

    // Return the doctor data if found
    return NextResponse.json(
      {
        message: "Got Info",
        data: doctor,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle errors (e.g., validation or DB errors)
    console.error("Error:", error);

    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
