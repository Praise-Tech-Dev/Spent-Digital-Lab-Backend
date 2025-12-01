const User = require("../models/usersModel");
const cloudinary = require("../config/cloudinary");
const Publication = require("../models/publicationModels");

const getUsers = async () => {
    try {
        const users = await User.find().select("-hash -__v -avatarPublicId");
        if (users.length == 0) {
            return new Error("No users found");
        }
        return users;

    } catch (error) {
        console.log("Error: ", error)
        return new Error(error.message);
    }
};

const approveUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return new Error("User not found");
        }

        //approve user
        await User.findByIdAndUpdate(userId, {status: 'approved'});
    } catch (error) {
        throw new Error(error.message);
    }
}

const createResearchPublication = async (file, payload) => {
    try {
        var fileUrl = ""

        if(!file){
            file = "https://placehold.co/600x400"
        } else{
            const result = await cloudinary.uploader.upload(file, {
            folder: 'publications',
            transformation: [{ width: 150, height: 150, crop: 'fill' }],
        });
        fileUrl = result.secure_url;
        }
        

        const newPublication = await Publication.create({
            ...payload,
            cover_image_url: fileUrl
        })

        return newPublication.toObject();
    } catch (error){
        console.log("Error:", error);
        return new Error(error.message);
    }
}

const publishResearch = async (researchId, userId) => {
    //check if the research exists
    try {
        const research = await Publication.findById(researchId);
        if(!research){
            return new Error("No research found"); 
        }
        await Publication.findByIdAndUpdate(researchId, { status: "PUBLISHED", approved_by: userId} );
    } catch (error) {
        console.log("Error", error);
        throw new Error(error.message);
    }
    
}

const getAllResearch = async () => {
    try {
        const researches = await Publication.find();
        if (researches.length == 0){
            return new Error("No research found");
        }
        return researches;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {getUsers, approveUser, createResearchPublication, publishResearch, getAllResearch };