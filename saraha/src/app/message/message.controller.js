import { getOwnMessagesService, sendPublicMessageService, sendMessageService } from "./message.service.js";

export async function sendPublicMessageController(req, res, next) {
    try {
        const message = await sendPublicMessageService(req.params.receiverId, req.body.content);
        return res.status(201).json({ success: true, message: "Message sent", data: message });
    } catch (error) { next(error); }
}

export async function sendMessageController(req, res, next) {
    try {
        const message = await sendMessageService(req.user.userId, req.params.receiverId, req.body.content);
        return res.status(201).json({ success: true, message: "Message sent", data: message });
    } catch (error) { next(error); }
}

export async function getOwnMessagesController(req, res, next) {
    try {
        const messages = await getOwnMessagesService(req.user.userId);
        return res.status(200).json({ success: true, results: messages.length, data: messages });
    } catch (error) { next(error); }
}
