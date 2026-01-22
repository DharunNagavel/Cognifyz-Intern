import express from "express";
import User from "../models/User.js";
import redisClient from "../config/redis.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const cached = await redisClient.get("users");

  if (cached) {
    console.log("⚡ From Cache");
    return res.json(JSON.parse(cached));
  }

  const users = await User.find().select("-password");
  await redisClient.setEx("users", 60, JSON.stringify(users));

  res.json(users);
});

export default router;
