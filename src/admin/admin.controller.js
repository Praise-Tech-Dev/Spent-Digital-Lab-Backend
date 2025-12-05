const StatusCodes = require("../utils/statusCodes");
const createResearchSchema = require("../validation/publicationSchema");
const updatePublicationSchema = require("../validation/updatePublicationSchema");
const {
  getUsers,
  approveUser,
  createResearchPublication,
  publishResearch,
  getAllResearch,
  updatePublication,
} = require("./admin.service");

const adminGetUsers = async (req, res) => {
  try {
    const response = await getUsers();
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No users found",
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Users fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Internal server error",
    });
  }
};

const adminApproveUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await approveUser(userId);
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "User approved successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

const createPublication = async (req, res) => {
  const user = req.user;
  const file = req.file;

  if (!req.body) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Request body is missing",
    });
  }
  const { error, value } = createResearchSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  var payload = value;
  payload.submitted_by = user.userId;
  try {
    const response = await createResearchPublication(file, value);
    if (response instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: response.message,
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Publication created successfully",
      data: response,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const adminPublishResearch = async (req, res) => {
  // remove the resarchId from the url
  const userId = req.user.userId
  const researchId = req.params.researchId;
  try {
    const response = await publishResearch(researchId, userId);
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: response.message,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Research Published successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const adminGetAllResearch = async (req, res) => {
  try {
    const response = await getAllResearch();
    if (response instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: response.message,
        data: [],
      });
    }
    return res.status(StatusCodes.OK).json({
        message: "Fetched research successfully",
        data: response,
    })
  } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
  }
};

const adminUpdatePublication = async (req, res) => {
  const publicationId = req.params.publicationId;
  if(!req.body) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Request body is missing",
    });
  }
  const {error, value} = updatePublicationSchema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  console.log(value)
  try {
    const response = await updatePublication(value, publicationId);
    if (response instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: response.message,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Publication updated successfully",
      data: response,
    });
  } catch (error) {
      console.error("Error", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      })
  }
}

module.exports = {
  adminGetUsers,
  adminApproveUser,
  createPublication,
  adminPublishResearch,
  adminGetAllResearch,
  adminUpdatePublication
};

