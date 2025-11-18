const cloudinary = require('../config/cloudinary');
const User = require('../models/usersModel');

const uploadAvatarService = async (file, userId) => {
    try {

        const result = await cloudinary.uploader.upload(file, {
            folder: 'avatars',
            transformation: [{ width: 150, height: 150, crop: 'fill' }],
        });
        
        // upload avatar url to user model
        await User.findByIdAndUpdate(userId, { avatarUrl: result.secure_url });

        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error(error.message);
        
    }
}


module.exports = { uploadAvatarService };