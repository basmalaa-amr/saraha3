import { verifyAccount } from "../auth/auth.service.js";

export async function verifyOTPController(req, res, next) {
    try {
        await verifyAccount(req.body.email, req.body.code);

        return res.status(200).json({
            message: "Account verified successfully"
        });
    } catch (error) {
        next(error);
    }
}