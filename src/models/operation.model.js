import mongoose from "mongoose";

const operationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['addition', 'subtraction', 'multiplication', 'division', 'square_root', 'random_string'],
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

//const User = mongoose.model('User', userSchema)
export default mongoose.model('Operation', operationSchema)