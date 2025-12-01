import { getCafeCache } from "../cache/CafeCache.js";
const GetCafes = (req, res) => {
  const cafes = getCafeCache();

  res.send(cafes);
};
export default GetCafes;
