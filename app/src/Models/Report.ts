import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Report document
export interface IReport extends Document {
  patient_id: mongoose.Types.ObjectId;
  nurse_id: mongoose.Types.ObjectId;
  report_date: Date;
  observations: string;
  medications_administered: {
    name: string;
    dose: string;
    time: Date;
  }[];
  next_steps?: string;
  files: {
    file_name: string;
    file_url: string;
    upload_date: Date;
  }[];
}

// Define the schema
const ReportSchema = new Schema<IReport>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  nurse_id: { type: Schema.Types.ObjectId, ref: 'Nurse', required: true },
  report_date: { type: Date, default: Date.now },
  observations: { type: String, required: true },
  medications_administered: [
    {
      name: { type: String },
      dose: { type: String },
      time: { type: Date, default: Date.now },
    },
  ],
  next_steps: { type: String },
  files: [
    {
      file_name: { type: String },
      file_url: { type: String },
      upload_date: { type: Date, default: Date.now },
    },
  ],
});

const ReportModel =
  mongoose.models && mongoose.models.Report
    ? (mongoose.models.Report as mongoose.Model<IReport>)
    : mongoose.model<IReport>("Report", ReportSchema);


export default ReportModel;
