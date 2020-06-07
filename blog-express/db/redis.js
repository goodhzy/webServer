const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", (err) => {
  console.log("redis连接失败: " + err);
});

module.exports = redisClient;
