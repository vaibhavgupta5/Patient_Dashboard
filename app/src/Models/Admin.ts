import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Admin document
export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  contact_number?: string;
  role: string;
  permissions: {
    can_add_patients: boolean;
    can_assign_staff: boolean;
    can_view_reports: boolean;
  };
  createdAt: Date;
}

// Define the schema
const AdminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  contact_number: { type: String },
  role: { type: String, default: 'Admin' },
  permissions: {
    can_add_patients: { type: Boolean, default: true },
    can_assign_staff: { type: Boolean, default: true },
    can_view_reports: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const AdminModel =
  mongoose.models && mongoose.models.Admin
    ? (mongoose.models.Admin as mongoose.Model<IAdmin>)
    : mongoose.model<IAdmin>("Admin", AdminSchema);



export default AdminModel;
