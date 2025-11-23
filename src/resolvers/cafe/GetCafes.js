import { getCafeCache } from "../cache/CafeCache.js";
const GetCafes = (req, res) => {
  const cafes = getCafeCache();
  const sortedCafes = [...cafes].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  res.send(sortedCafes);
};
export default GetCafes;
