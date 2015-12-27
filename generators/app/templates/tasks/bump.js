var fs = require('fs-extra');
var inquirer = require('inquirer');
var semver = require('semver');

var pkg = require('./../package.json');


var questions = [
  {
    name: 'severity',
    message: 'Release severity (current version: ' + pkg.version + ')',
    type: 'list',
    choices: ['patch', 'minor', 'major'].map(function (item) {
      return {
        value: item,
        name: item + ' (' + semver.inc(pkg.version, item) + ')'
      }
    }),
    default: 'patch'
  }
];


module.exports = function (callback) {
  inquirer.prompt(questions, function (answers) {
    pkg.version = semver.inc(pkg.version, answers.severity);
    var content = JSON.stringify(pkg, null, '  ');
    fs.writeFile('package.json', content, 'utf8', callback);
  });
}
