// import mongoose from "mongoose";

// const userSchema=mongoose.Schema({
//     fullname:{
//         type:String,
//         required:true
//     },
//     phoneNumber: { 
//         type: String, 
//         required: true, 
//         unique: true,
//         validate: {
//           validator: function(v) {
//             return /^[+]?[\d\s()-]{10,15}$/.test(v);
//           },
//           message: props => `${props.value} is not a valid phone number!`
//         }
//     },
//     password:{
//         type:String,
//         required:true
//     },
   
// })
// const User = mongoose.model("User",userSchema)
// export default User;

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[+]?[\d\s()-]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true
    },
    // FIX: Added the userType field to store the user's role
    userType: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;