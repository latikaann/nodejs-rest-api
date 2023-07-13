const { isValidObjectId } = require("mongoose");
const { NotFound } = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new NotFound(404, `${contactId} is not correct id format `);
    next(error);
  }
  next();
};

module.exports = isValidId;
