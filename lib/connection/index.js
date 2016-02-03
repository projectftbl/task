var configuration = require('@ftbl/configuration')
  , provider = configuration('subscriber') || 'redis'
  , connection =  require('./' + provider);

module.exports = connection;
