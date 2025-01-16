import connectDB from "@/lib/connectDB";
import NurseModel from "@/Models/Nurses";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addNurse = z.object({
    name : z.string(),
    email : z.string().email(),
    password: z.string().min(6),
    contact_number: z.string().min(10),
    shift: z.string()
})

export async function POST(req: NextRequest){

    const { name, email, password, contact_number, shift } = addNurse.parse(await req.json());

    connectDB();

    try {
        const nurse = await NurseModel.findOne({ email });
    
        if(nurse){
            return NextResponse.json( {
                status: 400,
                body: {
                    message: 'Nurse already exists'
                }
            }
        )}
    
        const newNurse = new NurseModel({
            name,
            email,
            password,
            contact_number,
            shift,
            createdAt: new Date()
        });
    
        await newNurse.save();
    
        return NextResponse.json( {
            status: 200,
            body: {
                message: 'New Nurse added successfully'
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