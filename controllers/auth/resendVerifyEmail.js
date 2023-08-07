const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers/sendEmail");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success.",
  });
};

module.exports = resendVerifyEmail;
