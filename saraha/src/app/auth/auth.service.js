import bcrypt from "bcrypt";
import { AppError } from "../common/error/error.js";
import { verifyToken } from "../common/utils/google.js";
import { generateAccessToken } from "../common/utils/jwt.js";
import { comparePassword } from "../common/utils/hash.js";
import * as cache from "../common/cache/redis.js";
import { createUser, findUserByEmail, updateUser } from "./auth.repository.js";
import { createOTPService } from "../otp/otp.service.js";

export async function registerService({ userName, email, password }) {
    const exists = await findUserByEmail(email);
    if (exists?.isVerified) throw new AppError("Email is already registered", 409);
    if (exists) {
        await createOTPService(exists._id, exists.email);
        return exists;
    }
    const user = await createUser({ userName, email, password: await bcrypt.hash(password, 10), provider: "local" });
    await createOTPService(user._id, user.email);
    return user;
}

export async function verifyAccount(email, submittedOTP) {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);
    if (user.isVerified) throw new AppError("Account is already verified", 409);
    const key = `otp:${user._id}`;
    const storedOTP = await cache.get(key);
    if (!storedOTP) throw new AppError("OTP not found or expired. Please request a new one.", 400);
    if (!(await comparePassword(submittedOTP, storedOTP))) throw new AppError("Invalid OTP", 400);
    await updateUser(user._id, { isVerified: true });
    await cache.del(key);
    return { message: "Account verified successfully" };
}

export async function sendOTP(email) {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);
    if (user.isVerified) throw new AppError("Account is already verified", 409);
    await createOTPService(user._id, user.email);
    return { message: "OTP sent successfully" };
}

export async function loginService({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user || !user.isVerified || !user.password || !(await comparePassword(password, user.password))) {
        throw new AppError("Invalid credentials or account not verified", 401);
    }
    return { message: "Login successful", token: generateAccessToken(user._id.toString()) };
}

export async function loginWithGoogle(idToken) {
    const payload = await verifyToken(idToken);
    if (!payload?.email || !payload.email_verified) throw new AppError("Google account email is not verified", 401);
    let user = await findUserByEmail(payload.email);
    if (!user) user = await createUser({ email: payload.email, userName: payload.name, provider: "google", isVerified: true, profilePicPath: payload.picture });
    return { token: generateAccessToken(user._id.toString()) };
}
