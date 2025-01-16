import mongoose, { Schema, Types, Document } from 'mongoose';

// Define the TypeScript interface for the Doctor document
interface IDoctor extends Document {
  name: string;
  email: string;
  password: string; // This will be stored as a hashed password
  contact_number: string;
  specialization?: string;
  patients: Array<{
    patient_id: Types.ObjectId;
    assigned_date: Date;
  }>;
  reports: Array<{
    report_id: Types.ObjectId;
    report_date: Date;
  }>;
  createdAt: Date;
}

// Define the Mongoose schema based on the TypeScript interface
const DoctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_number: { type: String, required: true },
  specialization: { type: String },
  patients: [
    {
      patient_id: { type: Schema.Types.ObjectId, ref: 'Patient' },
      assigned_date: { type: Date, default: Date.now },
    }
  ],
  reports: [
    {
      report_id: { type: Schema.Types.ObjectId, ref: 'Report' },
      report_date: { type: Date },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});


const DoctorModel =
  mongoose.models && mongoose.models.Doctor
    ? (mongoose.models.Doctor as mongoose.Model<IDoctor>)
    : mongoose.model<IDoctor>("Doctor", DoctorSchema);


// Export the model as a TypeScript type-safe model
export default DoctorModel;
