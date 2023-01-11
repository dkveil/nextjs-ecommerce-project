import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    wishlist: {
        type: Array,
        default: []
    },
    root: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Users = mongoose.models.users || mongoose.model('users' , UserSchema)

export default Users;