module.exports = function(name, data, options) {
  var redis = require('@ftbl/redis'); // On demand
  redis.connection.rpush('task:' + name, JSON.stringify({ data: data, options: options }));
};
