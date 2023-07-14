const express = require("express");
const router = express.Router();

const { validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validation(schemas.joiSchema), controllers.addNewContact);

router.delete("/:contactId", isValidId, controllers.removeById);

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.joiSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
