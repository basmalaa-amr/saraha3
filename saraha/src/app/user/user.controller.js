import { updateProfilePictureService } from "./user.service.js";

export async function uploadProfilePictureController(req, res, next) {
    try {
        const user = await updateProfilePictureService(req.user.userId, req.file);
        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
}
