import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ msg: "User already exists" });
      return;
    }

    if (password.length < 6 || password.length > 20) {
      res.status(400).json({
        msg: "Password should be minimum 6 and maximum 20 characters",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      msg: "User signed up successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ msg: "User not found, signup first" });
      return;
    }

    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) {
      res.status(401).json({ msg: "Password incorrect" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("userToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "User logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getMe = (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
