const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas/");
const { contacts: controllers } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", ctrlWrapper(controllers.getById));

router.post("/", validateMiddleware, ctrlWrapper(controllers.addNewContact));

router.delete("/:contactId", ctrlWrapper(controllers.removeById));

router.put(
  "/:contactId",
  validateMiddleware,
  ctrlWrapper(controllers.updateById)
);

module.exports = router;
