// import User from "../model/user.model.js";
// import bcryptjs from "bcryptjs"
// export const signup= async (req,res)=>{
//     try {
//         const {fullname,phoneNumber,password }=req.body;
//         const user= await User.findOne({phoneNumber})
//         if(user){
//             return res.status(400).json({message:"User already exists"})
//         }

//         const hashPassword = await bcryptjs.hash(password,10);

//         const createdUser=new User({
//             fullname: fullname,
//             phoneNumber: phoneNumber,
//             password: hashPassword,
//             role_type: student, teacher and School/NGO
//         })
//         await createdUser.save();
//         res.status(201).json({message:"User created successfully" , user:{
//             _id: createdUser._id,
//             fullname:createdUser.fullname,
//             phoneNumber:createdUser.phoneNumber,
//         }})
//     } catch (error) {
//         console.log("Error: " + error.message)
//         res.status(500).json({message:"Internal server error"})
        
//     }
// };

// export const login=async (req,res)=>{
//     try {
//         const {phoneNumber,password}=req.body;
//         const user = await User.findOne({phoneNumber});
//         const isMatch= await bcryptjs.compare(password,user.password)
//         if(!user || !isMatch){
//             return res.status(400).json({message:"Invalid username or password"});
//         }else{
//             res.status(200).json({message:"Login Successfull",user:{
//                 _id:user._id,
//                 fullname:user.fullname,
//                 phoneNumber:user.phoneNumber
//             }})
//         }
//     } catch (error) {
//         console.log("Error", + error.message)
//         res.status(500).json({message:"Internal server error"})
//     }


// import User from "../model/user.model.js";
// import bcryptjs from "bcryptjs";

// export const signup = async (req, res) => {
//     try {
//         // FIX 1: Destructure 'userType' from the request body
//         const { fullname, phoneNumber, password, userType } = req.body;
        
//         const user = await User.findOne({ phoneNumber });
//         if (user) {
//             return res.status(400).json({ message: "User with this phone number already exists" });
//         }

//         const hashPassword = await bcryptjs.hash(password, 10);

//         const createdUser = new User({
//             fullname: fullname,
//             phoneNumber: phoneNumber,
//             password: hashPassword,
//             userType: userType, // FIX 2: Save the user's role to the database
//         });
        
//         await createdUser.save();
        
//         res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 _id: createdUser._id,
//                 fullname: createdUser.fullname,
//                 phoneNumber: createdUser.phoneNumber,
//                 userType: createdUser.userType, // FIX 3: Send the role back to the front-end
//             }
//         });

//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { phoneNumber, password } = req.body;
//         const user = await User.findOne({ phoneNumber });
        
//         // Check if user exists before comparing password to prevent errors
//         if (!user) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         } else {
//             res.status(200).json({
//                 message: "Login Successful",
//                 user: {
//                     _id: user._id,
//                     fullname: user.fullname,
//                     phoneNumber: user.phoneNumber,
//                     userType: user.userType, // FIX 4: Send the role back to the front-end on login
//                 }
//             });
//         }
//     } catch (error) {
//         console.log("Error: ", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// import User from "../model/user.model.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken"; // 1. Import jsonwebtoken

// export const signup = async (req, res) => {
//     // ... (Your signup function is perfect, no changes needed here)
//     try {
//         const { fullname, phoneNumber, password, userType } = req.body;
        
//         const user = await User.findOne({ phoneNumber });
//         if (user) {
//             return res.status(400).json({ message: "User with this phone number already exists" });
//         }

//         const hashPassword = await bcryptjs.hash(password, 10);

//         const createdUser = new User({
//             fullname: fullname,
//             phoneNumber: phoneNumber,
//             password: hashPassword,
//             userType: userType,
//         });
        
//         await createdUser.save();
        
//         res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 _id: createdUser._id,
//                 fullname: createdUser.fullname,
//                 phoneNumber: createdUser.phoneNumber,
//                 userType: createdUser.userType,
//             }
//         });

//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { phoneNumber, password } = req.body;
//         const user = await User.findOne({ phoneNumber });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         } else {
//             // --- START OF UPDATE ---
//             // 2. Create the token payload
//             const payload = {
//                 id: user._id,
//                 userType: user.userType,
//             };

//             // 3. Sign the token with your secret key
//             const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
//                 expiresIn: "1d", // The token will expire in 1 day
//             });

//             // 4. Send the token and user info back to the frontend
//             res.status(200).json({
//                 message: "Login Successful",
//                 user: {
//                     _id: user._id,
//                     fullname: user.fullname,
//                     phoneNumber: user.phoneNumber,
//                     userType: user.userType,
//                 },
//                 token: token, // Send the token in the response
//             });
//             // --- END OF UPDATE ---
//         }
//     } catch (error) {
//         console.log("Error: ", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; // 1. Import jsonwebtoken

export const signup = async (req, res) => {
    // ... (Your signup function remains the same)
    try {
        const { fullname, phoneNumber, password, userType } = req.body;
        
        const user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({ message: "User with this phone number already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const createdUser = new User({
            fullname: fullname,
            phoneNumber: phoneNumber,
            password: hashPassword,
            userType: userType,
        });
        
        await createdUser.save();
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                phoneNumber: createdUser.phoneNumber,
                userType: createdUser.userType,
            }
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            
            const payload = {
                id: user._id,
                userType: user.userType,
            };

            // 🔑 FIX APPLIED HERE: Changed JWT_SECRET_KEY to the consistent JWT_SECRET
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d", // The token will expire in 1 day
            });

            res.status(200).json({
                message: "Login Successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    phoneNumber: user.phoneNumber,
                    userType: user.userType,
                },
                token: token, // Send the token in the response
            });
        }
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};