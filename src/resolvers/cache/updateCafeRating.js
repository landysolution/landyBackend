import redis from "./RedisClient.js";

export const updateCafeRating = async ({ cafeId, rating }) => {
  const id = String(cafeId);
 
  

  // Keys (clean + production-safe)
  const SUM_KEY = "cafe:rating:sum";
  const COUNT_KEY = "cafe:rating:count";
  const AVG_KEY = "cafe:rating:avg";

  // Increment rating sum & count atomically
  const newSum = await redis.hincrby(SUM_KEY, id, rating);
  const newCount = await redis.hincrby(COUNT_KEY, id, 1);

  // Compute average
  const avg = newSum / newCount;
  console.log(avg);
  console.log(id);
  
  

console.log("Updating AVG HASH:", id, avg);

  await redis.hset(AVG_KEY, '83137', '7');

  return {
    cafeId: id,
    sum: newSum,
    count: newCount,
    average: avg,
  };
};
