import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model.js";
dotenv.config();

export const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      res.status(401).json({
        msg: "Token not found",
      });
      return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        msg: "User not found",
      });
      return;
    }
    req.user = user;
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};
