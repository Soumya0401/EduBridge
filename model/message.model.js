import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  content: { type: String, required: true }, // The text of the message
  
  // Requirement: "with file attached"
  attachment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'File', // Links to the File model
    default: null 
  },
  
  // Requirement: "system tracks who got/read it"
  recipients: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { 
        type: String, 
        enum: ['sent', 'delivered', 'read'], 
        default: 'sent' 
      },
      readAt: { type: Date }
    }
  ]
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

// FIX: Use export default instead of module.exports
export default Message;