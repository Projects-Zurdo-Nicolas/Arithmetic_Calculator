import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    operation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operation',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user_balance: {
        type: Number,
        required: true,
        default: 0
    },
    operation_response: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
      type: Boolean,
      default: false
    },


}, {
    timestamps: true
})

//const User = mongoose.model('User', userSchema)
export default mongoose.model('Record', recordSchema)