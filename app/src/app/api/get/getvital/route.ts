import connectDB from "@/lib/connectDB";
import PatientModel from "@/Models/Patient";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getPatient = z.object({
    room_number: z.string().min(1, "Room number is required"),
      });

export async function POST(req: NextRequest){

    const {  room_number   } = getPatient.parse(await req.json());

    connectDB();

    try {
        const patient = await PatientModel.findOne({ room_number });
    
        if(!patient){
            return NextResponse.json( {
                status: 400,
                body: {
                    message: 'Patient not found'
                }
            }
        )}

      
    
        return NextResponse.json( {
            status: 200,
            body: {
                message: 'Got Info',               
                data: patient
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: error.message
            }
        })
        
    }
}