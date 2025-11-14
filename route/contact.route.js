import express from 'express';
import { submitContactForm } from '../controller/contact.controller.js';

const router = express.Router();

// Define the POST route for submitting the form
router.post('/', submitContactForm);

// Use 'export default' to make it compatible with your index.js
export default router;