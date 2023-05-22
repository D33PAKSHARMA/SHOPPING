import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("users", usermodel);
