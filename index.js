require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();
const port = 3000;
const postgresUrl = process.env.POSTGRES_URL;
const redisUrl = process.env.REDIS_URL;

const pool = new Pool({
  connectionString: postgresUrl,
});

pool.connect((err) => {
  if (err) {
    console.log("Error connecting to PostgreSQL", err);
    console.error("Failed to connect to PostgreSQL", err);
  } else {
    console.log("Connected to PostgreSQL ");
  }
});

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

app.get("/", (req, res) => {
  redisClient.set("key" + Math.random(), "value" + Math.random());
  res.send("Hello, World! Updated new redis data");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
