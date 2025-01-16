import connectDB from "@/lib/connectDB";
import PatientModel from "@/Models/Patient";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addPatientVitals = z.object({
  room_number: z.string().min(1, "Room number is required"),
  heart_rate: z.number().optional(),
  systolic: z.number().optional(),
  oxygen_saturation: z.number().optional(),
  respiratory_rate: z.number().optional(),
  temperature: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const {
      room_number,
      heart_rate,
      systolic,
      oxygen_saturation,
      respiratory_rate,
      temperature,
    } = addPatientVitals.parse(await req.json());

    // Connect to the database
    await connectDB();

    // Find the patient by room number
    const patient = await PatientModel.findOne({ room_number });

    if (!patient) {
      return NextResponse.json(
        {
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    // Push the new vital into the patient's health_metrics array
    const newVital = {
      blood_pressure: { systolic, diastolic: undefined }, // Add diastolic if needed
      heart_rate,
      oxygen_saturation,
      respiratory_rate,
      temperature,
      updated_at: new Date(), // Record the timestamp
    };

    if (!patient.health_metrics) {
      patient.health_metrics = [];
    }

    patient.health_metrics.push(newVital);

    // Save the updated patient
    await patient.save();

    return NextResponse.json(
      {
        message: "New vital added successfully",
        data: patient.health_metrics,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
