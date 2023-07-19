const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const favorite = req.query.favorite;

  let contacts = "";

  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
  } else {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
