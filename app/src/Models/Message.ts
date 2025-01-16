import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Message document
export interface IMessage extends Document {
  patient_id: mongoose.Types.ObjectId;
  sender_id: mongoose.Types.ObjectId;
  senderType: 'Patient' | 'Doctor' | 'Nurse';
  message: string;
  timestamp: Date;
  message_type: 'text' | 'video_call' | 'file';
  attachment_url?: string;
}

// Define the schema
const MessageSchema = new Schema<IMessage>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  sender_id: { type: Schema.Types.ObjectId, refPath: 'senderType', required: true },
  senderType: { type: String, enum: ['Patient', 'Doctor', 'Nurse'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message_type: { type: String, enum: ['text', 'video_call', 'file'], default: 'text' },
  attachment_url: { type: String },
});

const AdminModel =
  mongoose.models && mongoose.models.Message
    ? (mongoose.models.Message as mongoose.Model<IMessage>)
    : mongoose.model<IMessage>("Message", MessageSchema);


// Export the model
export default AdminModel;
