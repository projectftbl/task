var redis = require('@ftbl/redis');

module.exports = function(name, data, options) {
  redis.connection.rpush('task:' + name, JSON.stringify({ data: data, options: options }));
};
