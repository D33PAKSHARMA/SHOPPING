import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Verify Jwt Token
export const requiresign = (req, res, next) => {
  try {
    const decode = Jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
