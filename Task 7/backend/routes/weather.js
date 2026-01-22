const express = require("express");
const axios = require("axios");
const auth = require("../middleware/authMiddleware");
const limiter = require("../middleware/rateLimiter");

const router = express.Router();

router.get("/", auth, limiter, async (req, res) => {
  const { city } = req.query;
  if (!city)
    return res.status(400).json({ message: "City is required" });

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ message: "Weather API error" });
  }
});

module.exports = router;
