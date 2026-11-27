export function globalErrorHandler(error, req, res, next) {
    if (res.headersSent) return next(error);

    if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, message: "Image must be 2 MB or smaller" });
    }
    if (error.name === "MulterError") {
        return res.status(400).json({ success: false, message: error.message });
    }

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: error.message || "Internal server error" });
}
