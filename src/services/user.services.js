const cloudinary = require('../config/cloudinary');
const User = require('../models/usersModel');
const Publications = require('../models/publicationModels');

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

const updateUser = async (payload, userId) => {
    try {
        const user = await User.findById(userId);
        if(!user){
            return new Error("User not found");
        }

        const updated = await User.findByIdAndUpdate(userId, {
            firstName: payload?.firstName ||user.firstName,
            lastName: payload?.lastName || user.lastName,
            phoneNo: payload?.phoneNo || user.phoneNo,
            
        },{new: true}
    );
        
        const {_id, avatarPublicId,  __v, passwordHash, ...userData} = updated.toObject();
        return userData;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getPublications = async () => {
    try {
        const publications = await Publications.find({ status: "PUBLISHED" });
        if (publications.length == 0) {
            return new Error("No publications found");
        }
        return publications;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = { uploadAvatarService, getMeService, updateUser, getPublications };