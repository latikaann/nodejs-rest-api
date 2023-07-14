const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const addNewContact = require("./addNewContact");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  updateById: ctrlWrapper(updateById),
  removeById: ctrlWrapper(removeById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
