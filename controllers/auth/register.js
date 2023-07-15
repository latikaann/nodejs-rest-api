const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = register;