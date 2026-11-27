import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiredAt: {
        type: Date,
        required: true,
        index: { expires: 0 },
        index :{ expires: 0}

    }
})

const OTP = mongoose.model("OTP", OTPSchema)

export default OTP