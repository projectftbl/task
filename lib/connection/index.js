var configuration = require('@ftbl/configuration')
  , provider = configuration('subscriber') || 'redis'
  , connection =  require('./connection/' + provider);
    
module.exports = connection;
