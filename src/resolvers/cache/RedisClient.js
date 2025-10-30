import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redisClient = new Redis({
  url: "https://intimate-parrot-46424.upstash.io",
  token: token,
});
export default redisClient;
