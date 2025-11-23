import redis from "./RedisClient.js";

/**
 * Updates the Redis cache for a cafe rating
 * @param {string|number} cafeId - the ID of the cafe
 * @param {number} rating - rating number
 */
export const updateCafeRating = async ({ cafeId, rating }) => {
  if (!cafeId) throw new Error("cafeId is required");
  if (rating == null) throw new Error("rating is required");

  const id = String(cafeId).trim(); // ensure string and no whitespace
  const ratingNum = Number(rating);

  if (!id) throw new Error("Invalid cafeId");
  if (isNaN(ratingNum)) throw new Error("rating must be a number");

  const SUM_KEY = "cafe:rating:sum";
  const COUNT_KEY = "cafe:rating:count";
  const AVG_KEY = "cafe:rating:avg";

  // Increment sum & count atomically
  const newSum = await redis.hincrby(SUM_KEY, id, ratingNum);
  const newCount = await redis.hincrby(COUNT_KEY, id, 1);

  // Calculate average
  const avg = newSum / newCount;

  // Ensure primitives are stored
  await redis.hset(AVG_KEY, id, avg.toFixed(2));

  console.log("Updated cafe rating:", { id, sum: newSum, count: newCount, avg: avg.toFixed(2) });

  return {
    cafeId: id,
    sum: newSum,
    count: newCount,
    average: avg,
  };
};
