// const File = require('../model/file.model');
// const Message = require('../model/message.model');
// const Group = require('../model/group.model');

// /**
//  * Requirement 1: Teacher uploads a standalone file (resource)
//  * This just creates a 'File' document.
//  */
// module.exports.uploadResource = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     const newFile = new File({
//       filename: req.file.originalname,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       uploadedBy: req.user.id // From authMiddleware
//     });
    
//     await newFile.save();
//     res.status(201).json({ message: "File uploaded as a resource", file: newFile });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Requirement 2 & 3: Teacher sends a message (with file) & tracks recipients
//  */
// module.exports.createMessage = async (req, res) => {
//   try {
//     const { content, groupId } = req.body;
//     const senderId = req.user.id; // From authMiddleware

//     if (!content || !groupId) {
//         return res.status(400).json({ message: "Content and groupId are required." });
//     }

//     let attachedFile = null;
    
//     // 1. If a file is attached, create a File doc for it
//     if (req.file) {
//       const newFile = new File({
//         filename: req.file.originalname,
//         filePath: req.file.path,
//         fileType: req.file.mimetype,
//         uploadedBy: senderId
//       });
//       await newFile.save();
//       attachedFile = newFile; // We'll link this file's ID to the message
//     }

//     // 2. Get all members of the group to create the recipient list
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: 'Group not found' });
//     }
    
//     // Create recipient list (all members *except* the sender)
//     const recipientList = group.members
//       .filter(memberId => memberId.toString() !== senderId.toString())
//       .map(memberId => ({
//         user: memberId,
//         status: 'sent' 
//       }));

//     // 3. Create the message
//     const newMessage = new Message({
//       sender: senderId,
//       group: groupId,
//       content: content,
//       attachment: attachedFile ? attachedFile._id : null,
//       recipients: recipientList
//     });
    
//     await newMessage.save();
    
//     // 4. Requirement 4: Send Notifications (using Socket.io)
//     // We will add this logic later. For now, it just saves.
    
//     res.status(201).json(newMessage);
    
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Requirement 3 (Part 2): Student marks a message as read
//  */
// module.exports.markMessageAsRead = async (req, res) => {
//   try {
//     const { messageId } = req.body;
//     const userId = req.user.id; // From auth

//     const updatedMessage = await Message.findOneAndUpdate(
//       { _id: messageId, 'recipients.user': userId },
//       { 
//         $set: { 
//           'recipients.$.status': 'read',
//           'recipients.$.readAt': Date.now()
//         }
//       },
//       { new: true } // Return the updated document
//     );
    
//     if (!updatedMessage) {
//       return res.status(404).json({ message: 'Message not found or user not a recipient' });
//     }
    
//     res.status(200).json(updatedMessage);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import File from '../model/file.model.js';
import Message from '../model/message.model.js';
import Group from '../model/group.model.js';

/**
 * Requirement 1: Teacher uploads a standalone file (resource)
 * This just creates a 'File' document.
 */
const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const newFile = new File({
      filename: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id // From authMiddleware
    });
    
    await newFile.save();
    res.status(201).json({ message: "File uploaded as a resource", file: newFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Requirement 2 & 3: Teacher sends a message (with file) & tracks recipients
 */
const createMessage = async (req, res) => {
  try {
    const { content, groupId } = req.body;
    const senderId = req.user.id; // From authMiddleware

    if (!content || !groupId) {
        return res.status(400).json({ message: "Content and groupId are required." });
    }

    let attachedFile = null;
    
    // 1. If a file is attached, create a File doc for it
    if (req.file) {
      const newFile = new File({
        filename: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        uploadedBy: senderId
      });
      await newFile.save();
      attachedFile = newFile; // We'll link this file's ID to the message
    }

    // 2. Get all members of the group to create the recipient list
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Create recipient list (all members *except* the sender)
    const recipientList = group.members
      .filter(memberId => memberId.toString() !== senderId.toString())
      .map(memberId => ({
        user: memberId,
        status: 'sent' 
      }));

    // 3. Create the message
    const newMessage = new Message({
      sender: senderId,
      group: groupId,
      content: content,
      attachment: attachedFile ? attachedFile._id : null,
      recipients: recipientList
    });
    
    await newMessage.save();
    
    // 4. Requirement 4: Send Notifications (using Socket.io)
    // We will add this logic later. For now, it just saves.
    
    res.status(201).json(newMessage);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Requirement 3 (Part 2): Student marks a message as read
 */
const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.body;
    const userId = req.user.id; // From auth

    const updatedMessage = await Message.findOneAndUpdate(
      { _id: messageId, 'recipients.user': userId },
      { 
        $set: { 
          'recipients.$.status': 'read',
          'recipients.$.readAt': Date.now()
        }
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found or user not a recipient' });
    }
    
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// --- FIX: Export a single default object ---
// This matches the "import messageController from..." in your route file
export default {
  uploadResource,
  createMessage,
  markMessageAsRead
};