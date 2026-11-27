import { sendMail } from "../common/config/email.js";
import { hashOTP } from "../common/utils/otp.js";
import * as cache from "../common/cache/redis.js";

export async function createOTPService(userId, userEmail) {
    const key = `otp:${userId}`;
    await cache.del(key);
    const { otp, hashedOTP } = await hashOTP();
    await cache.set(key, hashedOTP, 300); 

    await sendMail(userEmail, "Verify your Saraha account",
        `<h2>Your verification code is ${otp}</h2><p>This code expires in 5 minutes.</p>`);
    return true;
}
