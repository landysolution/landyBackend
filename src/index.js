import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import { preloadCafeCache } from "./resolvers/cache/CafeCache.js";
import mongoose from "mongoose";
import CafeRoute from "./route/CafeRoute.js";
import SteamRoute from "./route/SteamRoute.js";
import UserRoute from "./route/UserRoute.js";
import cookieParser from "cookie-parser";
import memberRoute from './route/MemberRoute.js'
import http from 'http'
import { initWebSocket } from "./ws/wsServer.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
initWebSocket(server);
preloadCafeCache();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://www.landy.mn",
      "https://landy.mn",
      "http://localhost:3000"
    ],
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
app.use('/member',memberRoute)
const PORT = process.env.PORT;
server.listen(PORT, () => console.log("app is running on", PORT));
