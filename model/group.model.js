import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // This will be the Teacher's ID
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // List of all users in the group (teacher + students)
  }]
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

// FIX: Use export default instead of module.exports
export default Group;