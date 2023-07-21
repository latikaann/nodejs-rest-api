const fs = require("fs/promises");
const path = require("path");
const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}.${filename}`;

  const resultUpload = path.join(avatarsDir, avatarName);

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250);
  await image.writeAsync(resultUpload);

  const avatarURL = path.join("avatars", resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    status: "success",
    code: 200,
    avatarURL,
  });

  // await fs.unlink(req.file.path);
  // throw new Unauthorized("Not authorized");
};

module.exports = updateAvatar;
