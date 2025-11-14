import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // Original file name
  filePath: { type: String, required: true }, // Path on the server (e.g., 'uploads/file-123.pdf')
  fileType: { type: String, required: true }, // e.g., 'application/pdf'
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Teacher's ID
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

// FIX: Use export default instead of module.exports
export default File;