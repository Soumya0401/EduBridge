// In Backend/controller/contact.controller.js

import Contact from '../model/contact.model.js';

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, message, phone } = req.body;

        if (!name || !email || !message || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newContactMessage = new Contact({
            name,
            email,
            phone,
            message
        });

        await newContactMessage.save();
        console.log('Saved new contact message from:', email);
        res.status(200).json({ status: 'success', message: 'Thank you for your message!' });

    } catch (error)
    {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};