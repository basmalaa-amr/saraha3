import User from "./user.model.js";

export function findUserById(userId) {
    return User.findOne({ _id: userId, isDeleted: false });
}

export function updateUserById(userId, data) {
    return User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select("-password");
}
