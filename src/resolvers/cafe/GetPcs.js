import axios from "axios";
import redisClient from "../cache/RedisClient.js";

const GetPcs = async (req, res) => {
  try {
    const CAFE_ID = req.params.id;
    if (!CAFE_ID) {
      return res.status(400).json({ error: "Missing cafeId" });
    }
axios.interceptors.request.use(request => {
  console.log("Outgoing request:");
  console.log("URL:", request.url);
  console.log("Method:", request.method);
  console.log("Headers:", request.headers);
  return request;
});
    const response = await axios.get(
      `https://api.icafecloud.com/api/v2/cafe/${CAFE_ID}/pcs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXUS_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log the raw response from the API
    console.log("RAW API RESPONSE:", response.data);


    // Make sure it's an array before mapping
    const pcs = Array.isArray(response.data) ? response.data : [];
    console.log("PCS ARRAY:", pcs);

    const filtered = pcs.map((pc) => ({
      pc_name: pc.pc_name,
      pc_area_name: pc.pc_area_name,
      pc_in_using: pc.pc_in_using,
      pc_enabled: pc.pc_enabled,
      pc_box_top: pc.pc_box_top,
      pc_box_left: pc.pc_box_left,
    }));

    return res.status(200).json(filtered);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
};

export default GetPcs;
