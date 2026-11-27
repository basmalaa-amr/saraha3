import mongoose from "mongoose";
import { AppError } from "../common/error/error.js";
import { findUserById } from "../user/user.repository.js";
import { createMessage, findMessagesForReceiver } from "./message.repository.js";

function validateContent(content) {
    if (typeof content !== "string" || !content.trim() || content.trim().length > 2000) {
        throw new AppError("Message content is required and must be 2000 characters or fewer", 400);
    }
    return content.trim();
}

export async function sendPublicMessageService(receiverId, content) {
    content = validateContent(content);
    if (!mongoose.isValidObjectId(receiverId)) throw new AppError("Invalid receiver ID", 400);
    const receiver = await findUserById(receiverId);
    if (!receiver) throw new AppError("Receiver not found", 404);

    return createMessage({ content, receiver: receiver._id, sender: null });
}

export async function sendMessageService(senderId, receiverId, content) {
    content = validateContent(content);
    if (!mongoose.isValidObjectId(receiverId)) throw new AppError("Invalid receiver ID", 400);
    const receiver = await findUserById(receiverId);
    if (!receiver) throw new AppError("Receiver not found", 404);

    return createMessage({ content, receiver: receiver._id, sender: senderId });
}

export async function getOwnMessagesService(userId) {
    return findMessagesForReceiver(userId);
}
