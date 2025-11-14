// const Group = require('../model/group.model');
// const User = require('../model/user.model'); // You'll need the User model

// // 1. Create a new group (for teachers)
// module.exports.createGroup = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const teacherId = req.user.id; // From your authMiddleware

//     const newGroup = new Group({
//       name,
//       description,
//       createdBy: teacherId,
//       members: [teacherId] // The teacher who creates it is the first member
//     });

//     await newGroup.save();
//     res.status(201).json(newGroup);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating group: " + error.message });
//   }
// };

// // 2. Add a student to a group (for teachers)
// module.exports.addStudentToGroup = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const { studentEmail } = req.body; // Add student by email

//     // Find the student
//     const student = await User.findOne({ email: studentEmail, role: 'student' });
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found with that email' });
//     }

//     // Find the group
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: 'Group not found' });
//     }

//     // Check if student is already a member
//     if (group.members.includes(student._id)) {
//       return res.status(400).json({ message: 'Student is already in this group' });
//     }

//     // Add student and save
//     group.members.push(student._id);
//     await group.save();

//     res.status(200).json({ message: 'Student added successfully', group });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding student: " + error.message });
//   }
// };

// // 3. Get details for a single group
// module.exports.getGroupDetails = async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const group = await Group.findById(groupId)
//                              .populate('createdBy', 'username email') // Show teacher's info
//                              .populate('members', 'username email role'); // Show all members' info

//     if (!group) {
//       return res.status(404).json({ message: 'Group not found' });
//     }

//     res.status(200).json(group);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching group: " + error.message });
//   }
// };

// // 4. Get all groups a user belongs to
// module.exports.getMyGroups = async (req, res) => {
//     try {
//         const userId = req.user.id; // From authMiddleware
//         const groups = await Group.find({ members: userId });
//         res.status(200).json(groups);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching groups: " + error.message });
//     }
// }

import Group from "../model/group.model.js";
import User from "../model/user.model.js"; // You'll need the User model

// 1. Create a new group (for teachers)
const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const teacherId = req.user.id; // From your authMiddleware (verifyToken)

    const newGroup = new Group({
      name,
      description,
      createdBy: teacherId,
      members: [teacherId], // The teacher who creates it is the first member
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating group: " + error.message });
  }
};

// 2. Add a student to a group (for teachers)
const addStudentToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { studentphone } = req.body; // Add student by email

    // Find the student
    // Note: Your auth middleware stores 'userType'. Make sure your User model uses 'role'.
    // If your User model has 'userType', change 'role' to 'userType' below.
    const student = await User.findOne({
      phoneNumber: studentphone,
    });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found with that Phone" });
    }

    // Find the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if student is already a member
    if (group.members.includes(student._id)) {
      return res
        .status(400)
        .json({ message: "Student is already in this group" });
    }

    // Add student and save
    group.members.push(student._id);
    await group.save();

    res.status(200).json({ message: "Student added successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Error adding student: " + error.message });
  }
};

// 3. Get details for a single group
const getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate("createdBy", "username email") // Show teacher's info
      .populate("members", "username email role"); // Show all members' info

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group: " + error.message });
  }
};

// 4. Get all groups a user belongs to
const getMyGroups = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware (verifyToken)
    const groups = await Group.find({ members: userId }).populate("members");
    res.status(200).json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching groups: " + error.message });
  }
};

// --- FIX: Export a single default object ---
// This matches the "import groupController from..." in your route file
export default {
  createGroup,
  addStudentToGroup,
  getGroupDetails,
  getMyGroups,
};
