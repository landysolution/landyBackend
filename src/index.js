import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import { preloadCafeCache } from "./resolvers/cache/CafeCache.js";
import mongoose from "mongoose";
import CafeRoute from "./route/CafeRoute.js";
dotenv.config();
const app = express();
preloadCafeCache();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONT_TEST],
  })
);
const MONGO = process.env.MONGO;
mongoose
  .connect(MONGO)
  .then(console.log("mongoose connected"))
  .catch((err) => console.error("Mongo connection error:", err));
app.use("/cafe", CafeRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("app is running on", PORT));
