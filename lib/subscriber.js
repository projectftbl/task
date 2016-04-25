var util = require('util')
  , events = require('events');

var Subscriber = function() {
  if (this instanceof Subscriber === false) return new Subscriber;

  events.EventEmitter.call(this);
};

util.inherits(Subscriber, events.EventEmitter);

Subscriber.prototype.subscribe = function(name) {
  var that = this
    , Conn = require('./connection') 
    , conn = new Conn; // New connection for each listener

  var subscribe = function() {
    conn.blpop('task:' + name, 0, function(err, message) {
      if (err) that.emit('error', err);

      var data = JSON.parse(message[1]);

      if (!err && data) that.emit('data', data.data, data.options);

      subscribe(); // again
    });
  };

  return subscribe();
};

module.exports = Subscriber;