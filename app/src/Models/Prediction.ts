import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Prediction document
export interface IPrediction extends Document {
  patient_id: mongoose.Types.ObjectId;
  prediction_date: Date;
  risk_factor: {
    heart_disease: number;
    respiratory_issue: number;
    hypertension: number;
  };
  recommendation?: string;
  status: 'Normal' | 'Alert' | 'Critical';
}

// Define the schema
const PredictionSchema = new Schema<IPrediction>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  prediction_date: { type: Date, default: Date.now },
  risk_factor: {
    heart_disease: { type: Number },
    respiratory_issue: { type: Number },
    hypertension: { type: Number },
  },
  recommendation: { type: String },
  status: { type: String, enum: ['Normal', 'Alert', 'Critical'], default: 'Normal' },
});


const PredictionModel =
  mongoose.models && mongoose.models.Prediction
    ? (mongoose.models.Prediction as mongoose.Model<IPrediction>)
    : mongoose.model<IPrediction>("Admin", PredictionSchema);


// Export the model
export default PredictionModel;
