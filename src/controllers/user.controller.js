const { uploadAvatarService } = require("../services/user.services");

const uploadAvatar = async (req, res) => {
    const file = req.file.path;
    const user = req.user; // from authMiddleware

    try {
        const response = await uploadAvatarService(file, user.userId);

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

module.exports = {uploadAvatar};