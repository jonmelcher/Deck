const redis = require('promise-redis')();


const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;
const CLIENT = redis.createClient(REDIS_PORT, REDIS_HOST);

module.exports = { client: CLIENT };
