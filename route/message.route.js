// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const messageController = require('../controller/message.controller');
// const authMiddleware = require('../middleware/authMiddleware');

// // --- Multer setup for file uploads ---
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Make sure 'Backend/uploads/' folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });
// // --- End Multer Setup ---

// // All message routes should be protected
// router.use(authMiddleware);

// // Route for standalone resource upload
// router.post(
//   '/resource', 
//   upload.single('resourceFile'), // 'resourceFile' is the form field name
//   messageController.uploadResource
// );

// // Route for sending a message (with optional attachment)
// router.post(
//   '/message', 
//   upload.single('attachment'), // 'attachment' is the form field name
//   messageController.createMessage
// );

// // Route for marking a message as read
// router.post(
//   '/message/read', 
//   messageController.markMessageAsRead
// );

// module.exports = router;


import express from 'express';
import path from 'path';
import multer from 'multer';

// Import the controller (must use 'export default' in its file)
import messageController from '../controller/message.controller.js';

// Import the specific named functions from your middleware
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Multer setup for file uploads ---
// (This code doesn't need to change, but must be in the ES Module file)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'Backend/uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
// --- End Multer Setup ---

// --- FIX: Apply middleware correctly ---
// 1. All message routes should be protected (user must be logged in)
router.use(verifyToken);

// 2. Define specific routes with role authorization

// Route for standalone resource upload (Only teachers)
router.post(
  '/resource', 
  authorizeRoles('teacher'), // Only teachers can upload
  upload.single('resourceFile'), // 'resourceFile' is the form field name
  messageController.uploadResource
);

// Route for sending a message (Only teachers)
router.post(
  '/message', 
  authorizeRoles('teacher'), // Only teachers can send
  upload.single('attachment'), // 'attachment' is the form field name
  messageController.createMessage
);

// Route for marking a message as read (Any logged-in user who is a recipient)
router.post(
  '/message/read',
  authorizeRoles('student', 'teacher', 'school', 'ngo'), // Any valid user can read
  messageController.markMessageAsRead
);

// FIX: Use export default
export default router;