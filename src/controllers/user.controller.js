const { uploadAvatarService, getMeService, updateUser } = require("../services/user.services");
const StatusCodes = require("../utils/statusCodes")
const { UpdateUserSchema } = require("../validation/userSchema");

const uploadAvatar = async (req, res) => {
    const file = req.file;

    if(!file){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "No file uploaded",
        });
    }
    const filePath = file.path;
    const user = req.user; // from authMiddleware

    try {
        const response = await uploadAvatarService(filePath, user.userId);

        return res.status(StatusCodes.OK).json({
        message: "Avatar uploaded successfully",
        data: response,
    })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
    
}

const getMe = async (req, res) => {
    const userId = req.user.userId;
    try {
        const response = await getMeService(userId);
        return res.status(StatusCodes.OK).json({
            message: "User fetched successfully",
            data: response,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

const updateProfile = async (req, res) => {
    const user = req.user;
    if (!req.body) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Request body is missing",
        });
    }
    const { error, value } = UpdateUserSchema.validate(req.body);
    
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
    });
    }
    try {
        const response = await updateUser(value, user.userId);
        if (response instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: response.message,
            })
    }
    return res.status(StatusCodes.OK).json({
        message: "User updated successfully",
        data: response,
    });

} catch (error) {
    console.error("Error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
    })
}
}

module.exports = {uploadAvatar, getMe, updateProfile};