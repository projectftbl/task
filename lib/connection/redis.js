var redis = require('@ftbl/redis')
  , Redis = require('ioredis')

var Connection = function() {
  this.redis = new Redis(redis.config);

  this.blpop = function() {
    this.redis.blpop.apply(this.redis, arguments);
  }
};

module.exports = Connection;
