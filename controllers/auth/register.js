const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers/sendEmail");

const { BASE_URL } = process.env;

const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, salt);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: "starter",
      },
    },
  });
};

module.exports = register;
