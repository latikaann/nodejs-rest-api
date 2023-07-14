const express = require("express");
const router = express.Router();

const { validation, authenticate } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.joiRegisterSchema), ctrl.register);

router.post("/login", validation(schemas.joiLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

module.exports = router;
