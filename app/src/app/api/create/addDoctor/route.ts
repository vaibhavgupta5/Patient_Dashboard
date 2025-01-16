import connectDB from "@/lib/connectDB";
import DoctorModel from "@/Models/Doctor";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addDoctor = z.object({
    name : z.string(),
    email : z.string().email(),
    password: z.string().min(6),
    contact_number: z.string().min(10),
    specialization: z.string()
})

export async function POST(req: NextRequest){

    const { name, email, password, contact_number, specialization } = addDoctor.parse(await req.json());

    connectDB();

    try {
        const doctor = await DoctorModel.findOne({ email });
    
        if(doctor){
            return NextResponse.json( {
                status: 400,
                body: {
                    message: 'Doctor already exists'
                }
            }
        )}
    
        const newDoctor = new DoctorModel({
            name,
            email,
            password,
            contact_number,
            specialization,
            createdAt: new Date()
        });
    
        await newDoctor.save();
    
        return NextResponse.json( {
            status: 200,
            body: {
                message: 'New Doctor added successfully'
            }
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: 'Server Error'
            }
        })
        
    }
}