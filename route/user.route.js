// import express from "express";
// const router=express.Router()
// import { signup,login} from "../controller/user.controller.js";

// router.post("/signup", signup);
// router.post("/login", login);

// export default router;

import express from "express";
const router = express.Router();
// import { signup, login, getUserProfile } from "../controller/user.controller.js"; // 1. Import new controller function
import { signup, login } from "../controller/user.controller.js"; // 1. Import new controller function
import { verifyToken } from "../middleware/authMiddleware.js"; // 2. Import the middleware

// --- Public Routes (No token needed) ---
router.post("/signup", signup);
router.post("/login", login);

// // --- Protected Route (User must be logged in) ---
// // 3. Add the new route with the middleware
// router.get("/profile", verifyToken, getUserProfile);

export default router;