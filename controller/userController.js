import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

// ................... user registration || post......................

export const userRegistration = async (req, res) => {
  try {
    const { name, email, password, phone, answer } = req.body;
    // console.log(name, email, password, phone);
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    const user = await userModel.findOne({ email });
    if (user)
      return res.send({ success: false, message: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    const new_user = new userModel({
      name,
      email,
      password: hashpass,
      phone,
      answer,
    }).save();

    res.send({ success: true, message: "Register sucessfully", new_user });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "something error while saving data",
    });
  }
};

//.................. user login || post .....................

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "user not found" });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass)
      return res.send({ success: false, message: "Invalid password" });

    //Jwt Token
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login sucessfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//............... Reset Password...................

export const userReset = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!newpassword) {
      return res.send({ message: "newpassword is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) return res.send({ success: false, message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(newpassword, salt);

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: hashpass,
    });

    res.status(200).send({
      success: true,
      message: "User Reset Successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wrong while reset",
    });
  }
};

// Protected Route
export const testController = (req, res) => {
  res.send("Protected Route");
};
