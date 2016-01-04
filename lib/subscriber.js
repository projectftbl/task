var redis = require('@ftbl/redis')
  , Redis = require('ioredis')
  , util = require('util')
  , events = require('events');

var Subscriber = function() {
  if (this instanceof Subscriber === false) return new Subscriber;

  events.EventEmitter.call(this);
};

util.inherits(Subscriber, events.EventEmitter);

Subscriber.prototype.listen = function(name) {
  var that = this
    , conn = new Redis(redis.config);

  var listen = function() {
    conn.blpop('task:' + name, 0, function(err, message) {
      if (err) that.emit('error', err);

      var data = JSON.parse(message[1]);

      if (!err && data) that.emit('data', data.data, data.options);

      listen(); // again
    });
  };

  return listen();
};

module.exports = Subscriber;