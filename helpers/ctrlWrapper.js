const fs = require("fs/promises");

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      await fs.unlink(req.file.path);
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
