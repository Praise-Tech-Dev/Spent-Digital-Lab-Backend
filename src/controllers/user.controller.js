const { uploadAvatarService, getMeService } = require("../services/user.services");
const StatusCodes = require("../utils/statusCodes")

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

module.exports = {uploadAvatar, getMe};