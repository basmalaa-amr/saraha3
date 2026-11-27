import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
