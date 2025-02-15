import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: {type: mongoose.Schema.Types.ObjectId},
    role:
    {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        
    },
    team: {type: String},
    position: {type: String},
    tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task', // Reference to the Task model
        },
    ],
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
},{timestamps: true}
)
export const User = mongoose.model('User', Userschema)