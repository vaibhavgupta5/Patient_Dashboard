import mongoose, { Schema, Types, Document } from 'mongoose';

// Define the TypeScript interface for the Nurse document
interface INurse extends Document {
  name: string;
  email: string;
  password: string; // Hashed password
  contact_number: string;
  shift?: string; // Optional shift, e.g., "Day Shift", "Night Shift"
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
const NurseSchema = new Schema<INurse>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_number: { type: String, required: true },
  shift: { type: String },
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

const NurseModel =
  mongoose.models && mongoose.models.Nurse
    ? (mongoose.models.Nurse as mongoose.Model<INurse>)
    : mongoose.model<INurse>("Nurse", NurseSchema);





// Export the model as a TypeScript type-safe model
export default NurseModel;
