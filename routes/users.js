import express from "express";
import { getUser, update, follow, unFollow } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const app = express.Router();

// Update User
app.put("/:id", verifyToken, update);

// Get User
app.get("/find/:id", getUser);

// Follow
app.put("/follow/:id", verifyToken, follow);

// Unfollow
app.put("/unfollow/:id", verifyToken, unFollow);

export default app;
