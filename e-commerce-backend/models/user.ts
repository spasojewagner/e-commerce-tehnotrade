import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        terms: {
            type: Boolean,
            default: false,
        },
        dateOfBirth:{
            type: Date,
            require: false
        }
    },
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;