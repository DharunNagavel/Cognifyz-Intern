import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect();
redisClient.on("connect", () => console.log("Redis Connected"));

export default redisClient;
