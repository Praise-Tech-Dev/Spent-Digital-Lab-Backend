const {
  uploadAvatarService,
  getMeService,
  updateUser,
  getPublications,
  getSinglePublication,
} = require("../services/user.services");
const StatusCodes = require("../utils/statusCodes");
const { message } = require("../validation/publicationSchema");
const { UpdateUserSchema } = require("../validation/userSchema");

const uploadAvatar = async (req, res) => {
  const file = req.file;

  if (!file) {
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
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

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
    });
  }
};

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
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "User updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const GetPublication = async (_req, res) => {
  try {
    const response = await getPublications();
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No publication found",
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Fetched Publications successfully",
      data: response,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const GetSinglePublication = async (req, res) => {
  const publicationId = req.params.publicationId;
  console.log(publicationId)
  try {
    const response = await getSinglePublication(publicationId);
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Publication not found",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Publication found",
      data: response,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
    });
  }
};

module.exports = { uploadAvatar, getMe, updateProfile, GetPublication, GetSinglePublication };
