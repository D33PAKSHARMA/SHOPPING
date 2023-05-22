import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import userAuth from "./routes/userAuth.js";
import cors from "cors";
env.config();

const app = express();

app.use(express.json());
app.use(cors());

// DB connnetion
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connnetion successful"))
  .catch((err) => console.log(err));

// user Auth route
app.use("/api/v1", userAuth);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
