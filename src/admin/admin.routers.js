const express = require("express");
const { login } = require("../controllers/auth.controller");
const adminRouter = express.Router();
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const {
  adminGetUsers,
  adminApproveUser,
  createPublication,
  adminPublishResearch,
  adminGetAllResearch,
  adminUpdatePublication,
} = require("./admin.controller");
const upload = require("../middleware/multer");

// Admin login route
adminRouter.post("/login", login);

// get users (pending, banned and approved)
adminRouter.get("/users", authAdminMiddleware, adminGetUsers);

adminRouter.patch(
  "/users/:userId/approve",
  authAdminMiddleware,
  adminApproveUser
);

adminRouter.post(
  "/publications",
  authAdminMiddleware,
  upload.single("cover_image"),
  createPublication
);

adminRouter.patch(
  "/publications/:researchId/publish",
  authAdminMiddleware,
  adminPublishResearch
);

adminRouter.get("/publications", authAdminMiddleware, adminGetAllResearch);

adminRouter.put("/publications/:publicationId", authAdminMiddleware, adminUpdatePublication);

module.exports = adminRouter;
