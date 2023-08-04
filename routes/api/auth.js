const express = require("express");
const router = express.Router();

const { validation, authenticate, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.joiRegisterSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validation(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validation(schemas.joiLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/subscription",
  authenticate,
  validation(schemas.joiSubscriptionSchema),
  ctrl.updateSubscriptionUser
);

module.exports = router;
