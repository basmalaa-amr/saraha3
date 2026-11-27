import OTP from "./otp.model.js";

export async function createOTP(data){
    return OTP.create(data)
}
export async function findOTPByUserId(userId){
    return OTP.findOne({ userId });
}
export async function deleteOTPsByUserId(userId){
     return OTP.deleteMany({ userId });
}