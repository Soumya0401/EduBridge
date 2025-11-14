// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";

// const app = express()

// app.use(cors());
// app.use(express.json());

// dotenv.config()

// const PORT=process.env.PORT || 4000;
// const MongoDB=process.env.MongoDBURI;

// // connect to mongo db
// try {
//     mongoose.connect(MongoDB,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     console.log("Connected to mongoDB");
// } catch (error) {
//     console.log("Error: ", error)
    
// }

// // defining routes
// app.use("/book", bookRoute);
// app.use("/user",userRoute);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// });

// app.get("", (req, res, next) => {
//   res.send("Welcome to Education Bridge Project");
// });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";
// import contactRoute from "./route/contact.route.js"; 

// const app = express();

// // --- START OF FIX ---
// // Specifically allow requests from your frontend's origin
// const corsOptions = {
//   origin: 'http://localhost:5174',// Your frontend's address
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// // --- END OF FIX ---

// app.use(express.json());

// dotenv.config();

// const PORT = process.env.PORT || 4000;
// const MongoDB = process.env.MongoDBURI;

// // connect to mongo db
// try {
//     mongoose.connect(MongoDB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     console.log("Connected to mongoDB");
// } catch (error) {
//     console.log("Error: ", error);
// }

// // defining routes
// app.use("/book", bookRoute);
// app.use("/user", userRoute);
// app.use("/contact", contactRoute); 

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to Education Bridge Project");
// });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";
// import contactRoute from "./route/contact.route.js";
// const groupRoute = require('./route/group.route');

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173', // Your frontend's address
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// dotenv.config();

// const PORT = process.env.PORT || 4001;
// const MongoDB = process.env.MongoDBURI;

// // --- START OF FIX ---
// // Updated MongoDB connection logic
// try {
//     mongoose.connect(MongoDB, {  
//         // Add these options to solve the certificate issue
//         tls: true,
//         tlsAllowInvalidCertificates: true
//     });
//     console.log("Connected to mongoDB");
// } catch (error) {
//     console.log("Error: ", error);
// }
// // --- END OF FIX ---


// // defining routes
// app.use("/book", bookRoute);
// app.use("/user", userRoute);
// app.use("/contact", contactRoute);
// app.use("/api", groupRoute);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to Education Bridge Project");
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// --- Routes ---
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";
import groupRoute from "./route/group.route.js"; // Corrected to use import
import messageRoute from "./route/message.route.js"; // Added new route

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend's address
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4001;
const MongoDB = process.env.MongoDBURI;

// connect to mongo db
try {
    mongoose.connect(MongoDB, {   
        // Added options for certificate issue
        tls: true,
        tlsAllowInvalidCertificates: true
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/api", groupRoute);
app.use("/api", messageRoute); // Added new route

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Education Bridge Project");
});