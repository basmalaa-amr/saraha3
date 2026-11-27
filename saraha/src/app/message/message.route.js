import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { sendPublicMessageController, sendMessageController, getOwnMessagesController } from "./message.controller.js";

export const messageRouter = Router();
messageRouter.post("/public/:receiverId", sendPublicMessageController);
messageRouter.post("/:receiverId", authenticate, sendMessageController);
messageRouter.get("/my", authenticate, getOwnMessagesController);
