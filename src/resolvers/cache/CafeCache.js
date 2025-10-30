import RedisClient from "./RedisClient.js";
import cafeModel from "../../model/CafeModel.js";

let cafeCache = [];

export const preloadCafeCache = async () => {
  try {
    let data = await RedisClient.get("cafe");

    if (data) {
      cafeCache = typeof data === "string" ? JSON.parse(data) : data;
      console.log(`✅ Loaded ${cafeCache.length} cafes from Redis into memory`);
    } else {
      const cafeData = await cafeModel.find({});
      await RedisClient.set("cafe", JSON.stringify(cafeData));
      cafeCache = cafeData;
      console.log(
        `⚡ Loaded ${cafeCache.length} cafes from MongoDB into memory and Redis`
      );
    }
  } catch (err) {
    console.error("❌ Failed to load cafe cache:", err);
    cafeCache = [];
  }
};

export const getCafeCache = () => cafeCache;
