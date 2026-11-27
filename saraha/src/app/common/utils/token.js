import { JWT } from "jsonwebtoken";

export async function generateAccessToken(payload) {
    return JWT.sign({payload}, process.env.JWT_SECRET ,{expiresIn: process.env.JWT_EXPIRES_IN})
     
    
}