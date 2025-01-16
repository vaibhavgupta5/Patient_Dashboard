import connectDB from "@/lib/connectDB";
import AdminModel from "@/Models/Admin";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const addAdmin = z.object({
    name : z.string(),
    email : z.string().email(),
    password: z.string().min(6),
    contact_number: z.string().min(10),
    role: string(),
    permissions: z.object({
        can_add_patients: z.boolean(),
        can_assign_staff: z.boolean(),
        can_view_reports: z.boolean()
    })
})

export async function POST(req: NextRequest){

    const { name, email, password, contact_number, role, permissions } = addAdmin.parse(await req.json());

    connectDB();

    try {
        const admin = await AdminModel.findOne({ email });
    
        if(admin){
            return NextResponse.json( {
                status: 400,
                body: {
                    message: 'Admin already exists'
                }
            }
        )}
    
        const newAdmin = new AdminModel({
            name,
            email,
            password,
            contact_number,
            role,
            permissions,
            createdAt: new Date()
        });
    
        await newAdmin.save();
    
        return NextResponse.json( {
            status: 200,
            body: {
                message: 'New Admin added successfully'
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