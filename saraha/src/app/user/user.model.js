
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: function () {
                return this.provider === "local";
            }
        },

        provider: {
            type: String,
            enum: ["google", "facebook", "local"]
        },

        profilePicPath: {
            type: String
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
 