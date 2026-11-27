import { randomInt } from "node:crypto";
import bcrypt from "bcrypt";

export function generateOTPutil() {
    // return Math.floor(Math.random() * 900000) + 100000
    return randomInt(100000, 1000000).toString();

}
export async function hashOTP() {
    const otp = generateOTPutil();
    const hashedOTP = await bcrypt.hash(otp, 10)
    return { otp, hashedOTP };

}
