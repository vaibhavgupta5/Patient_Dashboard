import connectDB from "@/lib/connectDB";
import NurseModel from "@/Models/Nurses";
import PatientModel, { HealthMetricSchema } from "@/Models/Patient";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addPatient = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  gender: z.enum(["Male", "Female", "Other"]),
  contact: z.object({
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email format"),
  }),
  address: z.string().optional(),
  emergency_contact: z
    .object({
      name: z.string().optional(),
      relation: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  room_number: z.string().min(1, "Room number is required"),
  assigned_doctor: z.string().optional(),
  heart_rate: z.number().optional(),
  assigned_nurse: z.string().optional(),
  systolic: z.number().optional(),
  diastolic: z.number().optional(),
  oxygen_saturation: z.number().optional(),
  respiratory_rate: z.number().optional(),
  temperature: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const {
    name,
    age,
    gender,
    contact,
    address,
    emergency_contact,
    room_number,
    assigned_doctor,
    assigned_nurse,
    heart_rate,
    systolic,
    diastolic,
    oxygen_saturation,
    respiratory_rate,
    temperature,
  } = addPatient.parse(await req.json());

  connectDB();

  try {
    const patient = await NurseModel.findOne({ room_number });

    if (patient) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "patient already exists",
        },
      });
    }

    // if (patient && patient?.assigned_doctor) {
    //     patient.assigned_doctor = new mongoose.Types.ObjectId(patient.assigned_doctor) || '';
    //   }
    //   if (data.assigned_nurse) {
    //     data.assigned_nurse = new mongoose.Types.ObjectId(data.assigned_nurse);
    //   }

    const newPatient = new PatientModel({
      name,
      age,
      gender,
      contact,
      address,
      emergency_contact,
      room_number,
      assigned_doctor: assigned_doctor
        ? new mongoose.Types.ObjectId(assigned_doctor)
        : "",
      assigned_nurse: assigned_nurse
        ? new mongoose.Types.ObjectId(assigned_nurse)
        : "",
      health_metrics: {
        heart_rate,
        blood_pressure: {
          systolic,
          diastolic,
        },
        oxygen_saturation,
        respiratory_rate,
        temperature,
        updated_at: new Date(),
      },

      createdAt: new Date(),
    });

    await newPatient.save();

    return NextResponse.json({
      status: 200,
      body: {
        message: "New Patient added successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
      },
    });
  }
}
