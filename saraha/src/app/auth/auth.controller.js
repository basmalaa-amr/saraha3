import { loginService, registerService, verifyAccount, sendOTP, loginWithGoogle } from "./auth.service.js";

export async function registerController(req, res, next) {
    try {
        const user = await registerService(req.body);
        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(201).json({ success: true, message: "Registration successful. Check your email for the OTP.", user: safeUser });
    } catch (error) { next(error); }
}
export async function verifyAccountController(req, res, next) {
    try { const result = await verifyAccount(req.body.email, req.body.code); return res.status(200).json({ success: true, ...result }); }
    catch (error) { next(error); }
}
export async function sendOTPController(req, res, next) {
    try { return res.status(200).json({ success: true, ...(await sendOTP(req.body.email)) }); }
    catch (error) { next(error); }
}
export async function loginController(req, res, next) {
    try { return res.status(200).json({ success: true, ...(await loginService(req.body)) }); }
    catch (error) { next(error); }
}
export async function loginWithGoogleController(req, res, next) {
    try { return res.status(200).json({ success: true, ...(await loginWithGoogle(req.body.idToken)) }); }
    catch (error) { next(error); }
}
