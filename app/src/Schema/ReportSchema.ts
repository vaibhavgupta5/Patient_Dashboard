import { z } from 'zod';

const MedicationsAdministeredSchema = z.object({
  name: z.string().min(1, { message: 'Medication name is required' }),
  dose: z.string().min(1, { message: 'Dose is required' }),
  time: z.date().optional(), // Optional date, default handling can be done in the API
});

const FilesSchema = z.object({
  file_name: z.string().min(1, { message: 'File name is required' }),
  file_url: z.string().url({ message: 'Invalid file URL' }),
  upload_date: z.date().optional(), // Optional date, can be added server-side
});

const ReportSchema = z.object({
  patient_id: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: 'Invalid patient ID',
  }),
  nurse_id: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: 'Invalid nurse ID',
  }),
  observations: z.string().min(1, { message: 'Observations are required' }),
  medications_administered: z.array(MedicationsAdministeredSchema).optional(), // Optional array of medications
  next_steps: z.string().optional(), // Optional string
  files: z.array(FilesSchema).optional(), // Optional array of files
});

export default ReportSchema;
