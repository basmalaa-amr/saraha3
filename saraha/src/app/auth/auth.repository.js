import User from "../user/user.model.js"    
 
 
 export async function findUserByEmail(email)  {
    return User.findOne({email:email})
 }

export async function createUser(data){
    return User.create(data)
}

export async function updateUser(userId, data) {
    return User.findByIdAndUpdate(userId, data, { new: true });
}