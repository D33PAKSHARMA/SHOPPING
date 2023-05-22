import express from "express";
import {
  testController,
  userLogin,
  userRegistration,
  userReset,
} from "../controller/userController.js";
import { isAdmin, requiresign } from "../middleware/authMiddleware.js";

const router = express.Router();

// register user || Post
router.post("/register", userRegistration);

// user login || post
router.post("/login", userLogin);

// user Reset || post
router.post("/forgot-password", userReset);

// Protected Route
router.get("/test", requiresign, testController);

// Protected Route for User
router.get("/user-auth", requiresign, (req, res) => {
  res.send({ ok: true });
});

// Protected Route for Admin
router.get("/admin-auth", requiresign, isAdmin, (req, res) => {
  res.send({ ok: true });
});

export default router;
