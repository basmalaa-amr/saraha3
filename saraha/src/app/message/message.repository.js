import Message from "./message.model.js";

export function createMessage(data) {
    return Message.create(data);
}

export function findMessagesForReceiver(receiverId) {
    return Message.find({ receiver: receiverId, isDeleted: false })
        .sort({ createdAt: -1 })
        .populate("sender", "userName profilePicPath");
}
