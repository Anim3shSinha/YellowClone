import express from "express";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import exp from "constants";
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: "https://animesh-twitter-clone.netlify.app", // Replace with your Netlify app's URL
  credentials: true, // Enable credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(PORT, () => {
  connect();
  console.log("Listening to port 5000");
});
