import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connect from "./app/common/db/connection.js";
import { authRouter } from "./app/auth/auth.route.js";
import { messageRouter } from "./app/message/message.route.js";
import { userRouter } from "./app/user/user.route.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
await connect();
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const shutdown = () => server.close(async () => {
    await mongoose.disconnect();
    console.log("Database disconnected");
    process.exit(0);
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
