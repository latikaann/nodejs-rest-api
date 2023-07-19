const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw new NotFound(404, { message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscriptionUser;
