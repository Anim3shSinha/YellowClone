import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
  updatedTweet,
} from "../controllers/tweet.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express.Router();

// Create a Tweet
app.post("/", verifyToken, upload.single("imageData"), createTweet);

// Delete a Tweet
app.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a Tweet
app.put("/:id/like", likeOrDislike);

// get all timeline tweets
app.get("/timeline/:id", getAllTweets);

// get user Tweets only
app.get("/user/all/:id", getUserTweets);

//explore
app.get("/explore", getExploreTweets);

//delete
app.delete("/delete/:id", deleteTweet);

//update
app.put("/update/:id", upload.single("imageData"), updatedTweet);
export default app;
