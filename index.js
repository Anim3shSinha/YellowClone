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
console.log(__dirname);

const app = express();
// dotenv.config();
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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

// app.use(express.static(path.join(__dirname, "./client/build")));
// // app.use(express.static(path.join("./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     // path.join("./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
// }

app.listen(PORT, () => {
  connect();
  console.log("Listening to port 5000");
});
