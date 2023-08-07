const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  emailSchema,
};

module.exports = {
  User,
  schemas,
};
