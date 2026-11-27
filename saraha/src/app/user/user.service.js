import { AppError } from "../common/error/error.js";
import { findUserById, updateUserById } from "./user.repository.js";

export async function updateProfilePictureService(userId, file) {
    if (!file) throw new AppError("Please choose an image", 400);

    const user = await findUserById(userId);
    if (!user) throw new AppError("User not found", 404);

    const profilePicPath = `/uploads/profile-pictures/${file.filename}`;
    return updateUserById(userId, { profilePicPath });
}
