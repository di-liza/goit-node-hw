import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import fs from "fs/promises";
import gravatar from "gravatar";
import jimp from "jimp";
import jwt from "jsonwebtoken";
import path from "path";

import { CtrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import User from "../models/user.js";

const avatarPath = path.resolve("public", "avatars");

dotenv.config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");

  const avatarURL = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "404",
  });

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const subscription = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json(req.body);
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  const image = await jimp.read(oldPath);
  await image.resize(250, 250).write(newPath);

  await fs.unlink(oldPath);

  const avatarURL = path.join("avatars", filename);

  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

export default {
  register: CtrlWrapper(register),
  login: CtrlWrapper(login),
  logout: CtrlWrapper(logout),
  getCurrent: CtrlWrapper(getCurrent),
  updateSubscription: CtrlWrapper(updateSubscription),
  updateAvatar: CtrlWrapper(updateAvatar),
};
