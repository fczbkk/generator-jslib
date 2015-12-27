var fs = require('fs-extra');

var msg = 'Cleaning up temp folder.';

console.log('START ' + msg)

fs.emptyDir('./temp', function (error) {
  if (error) {throw error;}
  console.log('DONE ' + msg)
});
