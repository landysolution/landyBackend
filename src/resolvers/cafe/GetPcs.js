import axios from "axios";
import redisClient from "../cache/RedisClient.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pcs = require("./pcs.json"); // safe in ESM, CommonJS, nodemon, Node 22

// const CACHE_TTL = 900

const GetPcs = async (req, res) => {
  try {
    // const CAFE_ID = req.params.id;
    // if (!CAFE_ID) {
    //   return res.status(400).json({ error: "Missing cafeId" });
    // }

    // const CACHE_KEY = `${CAFE_ID}_pcs`;

    // const cachedData = await redisClient.get(CACHE_KEY);
    // if (cachedData) {
    //   console.log("[CACHE HIT]", CAFE_ID);
    //   return res.status(200).json(JSON.parse(cachedData));
    // }

    // const response = await axios.get(
    //   `https://api.icafecloud.com/api/v2/cafe/${CAFE_ID}/pcs`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.NEXUS_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const pcs = response.data;

    const filtered = pcs.map((pc) => ({
      pc_name: pc.pc_name,
      pc_area_name: pc.pc_area_name,
      pc_in_using: pc.pc_in_using,
      pc_enabled: pc.pc_enabled,
      pc_box_top: pc.pc_box_top,
      pc_box_left: pc.pc_box_left,
    }));

    // await redisClient.set(CACHE_KEY, JSON.stringify(filtered), {
    //   EX: CACHE_TTL,
    // });

    // console.log("[CACHE MISS] fetched from API", CAFE_ID);
    return res.status(200).json(filtered);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
};

export default GetPcs;
