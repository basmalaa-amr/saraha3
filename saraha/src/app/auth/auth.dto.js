import { z } from "zod";
export const registerDto = z.object({ userName: z.string().trim().min(2).max(20), email: z.email().trim().toLowerCase(), password: z.string().min(8) });
export const verifyAccountDto = z.object({ email: z.email().trim().toLowerCase(), code: z.string().length(6) });
export const loginDto = z.object({ email: z.email().trim().toLowerCase(), password: z.string().min(8) });
export const sendOtpDto = z.object({ email: z.email().trim().toLowerCase() });
export const loginWithGoogleDto = z.object({ idToken: z.string().min(1) });
