import express from "express";
import { signin, signup } from "../controllers/auth.js";

const app = express.Router();

app.post("/signup", signup);
app.post("/signin", signin);

export default app;
