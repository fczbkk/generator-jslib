var async = require('async');
var executeCommand = require('./execute-command');

var pkg = require('./../package.json');


function commit (callback) {
  var message = 'Release v' + pkg.version;
  var command = 'git commit --all --message=\'' + message + '\'';
  executeCommand(command, callback);
}


function tag (callback) {
  var tag_name = 'v' + pkg.version;
  var command = 'git tag -a ' + tag_name + ' --message=\'' + tag_name + '\'';
  executeCommand(command, callback);
}


function push (callback) {
  var command = 'git push';
  executeCommand(command, callback);
}


function pushTag (callback) {
  var command = 'git push origin --tags';
  executeCommand(command, callback);
}


module.exports = function (callback) {
  var tasks = [
    commit,
    tag,
    push,
    pushTag
  ];
  async.series(tasks, callback);
}
