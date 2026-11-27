import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload.userId) return res.status(401).json({ success: false, message: "Invalid token" });

        req.user = { userId: payload.userId };
        next();
    } catch {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}
