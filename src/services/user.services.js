const cloudinary = require('../config/cloudinary');
const User = require('../models/usersModel');

const uploadAvatarService = async (file, userId) => {
    try {
        const user = await User.findById(userId);
        if(user?.avatarPublicId){
            await cloudinary.uploader.destroy(user.avatarPublicId);    
        }
        const result = await cloudinary.uploader.upload(file, {
            folder: 'avatars',
            transformation: [{ width: 150, height: 150, crop: 'fill' }],
        });


        // upload avatar url to user model
        await User.findByIdAndUpdate(userId, { avatarUrl: result.secure_url, avatarPublicId: result.public_id });

        return { url: result.secure_url, public_id: result.public_id };
        
        
        
    } catch (error) {
        throw new Error(error.message);
        
    }
}

const getMeService = async (userId) => {
    try {
        const user = await User.findById(userId).select('-passwordHash');
        const {__v, avatarPublicId, ...userData} = user.toObject();
        return userData;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { uploadAvatarService, getMeService };