import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import { preloadCafeCache } from "./resolvers/cache/CafeCache.js";
import mongoose from "mongoose";
import CafeRoute from "./route/CafeRoute.js";
import SteamRoute from "./route/SteamRoute.js";
import UserRoute from "./route/UserRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
preloadCafeCache();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_TEST,
    credentials: true,
  })
);
const MONGO = process.env.MONGO;
mongoose
  .connect(MONGO)
  .then(console.log("mongoose connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.use("/cafe", CafeRoute);
app.use("/steam", SteamRoute);
app.use("/auth", UserRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("app is running on", PORT));
