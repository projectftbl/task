var fs = require('fs')
  , path = require('path')
  , Subscriber = require('./subscriber');

module.exports = function(lib, folders) {
  folders.forEach(function(folder) {

    var directory = path.join(lib, folder, 'subscribers');

    if (fs.existsSync(directory) === false) return;

    var files = fs.readdirSync(directory);

    files.forEach(function(file) {
      var Task = require(path.join(directory, file));
      new Task(new Subscriber).listen();
    });
  });
};