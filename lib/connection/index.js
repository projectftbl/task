var configuration = require('@recipher/configuration')
  , provider = configuration('subscriber') || 'redis'
  , connection =  require('./' + provider);

module.exports = connection;
