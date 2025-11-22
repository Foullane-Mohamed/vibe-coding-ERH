const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect', () => console.log('Redis Client Connected'));

  await redisClient.connect();
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
