import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active'
    },
    balance: { 
        type: Number,
        required: true,
        default: 5 //Default Value. Value that all users start with. A small gift for signing up to the app 
    }
}, {
    timestamps: true
})

//const User = mongoose.model('User', userSchema)
export default mongoose.model('User', userSchema)