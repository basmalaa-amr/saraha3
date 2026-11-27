import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { AppError } from "../error/error.js";

const uploadDirectory = path.resolve("uploads/profile-pictures");
mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadDirectory),
    filename: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        callback(null, `${randomUUID()}${extension}`);
    }
});

function fileFilter(_req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
        return callback(new AppError("Only JPG, PNG, and WEBP images are allowed", 400));
    }
    callback(null, true);
}

export const uploadProfilePicture = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024, files: 1 }
}).single("profilePicture");
