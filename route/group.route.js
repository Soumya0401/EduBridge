// import express from 'express';
// // Make sure these files also use 'export default' or named exports
// import groupController from '../controller/group.controller.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// // All group routes should be protected
// router.use(authMiddleware);

// // POST /api/groups - Create a new group
// router.post('/groups', groupController.createGroup);

// // POST /api/groups/:groupId/members - Add a member to a group
// router.post('/groups/:groupId/members', groupController.addStudentToGroup);

// // GET /api/groups/mygroups - Get all groups for the logged-in user
// router.get('/groups/mygroups', groupController.getMyGroups);

// // GET /api/groups/:groupId - Get details for one group
// router.get('/groups/:groupId', groupController.getGroupDetails);

// // Use export default instead of module.exports
// export default router;

import express from "express";
import groupController from "../controller/group.controller.js";

// FIX: Use named imports {} to get the specific functions
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// FIX: Use the specific 'verifyToken' middleware first for all routes
// This will protect every route in this file
router.use(verifyToken);

// Now, you can use 'authorizeRoles' on specific routes
// (I'm assuming 'teacher' is the role that can manage groups)

// POST /api/groups - Only teachers can create groups
router.post("/groups", authorizeRoles("teacher"), groupController.createGroup);

// POST /api/groups/:groupId/members - Only teachers can add members
router.post(
  "/groups/:groupId/members",
  authorizeRoles("teacher"),
  groupController.addStudentToGroup
);

// GET /api/groups/mygroups - Both students and teachers can see their own groups
router.get(
  "/groups/mygroups",
  authorizeRoles("student", "teacher"),
  groupController.getMyGroups
);

// GET /api/groups/:groupId - Both students and teachers can see group details
router.get(
  "/groups/:groupId",
  authorizeRoles("student", "teacher"),
  groupController.getGroupDetails
);

export default router;
