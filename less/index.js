'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var LessGenerator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
};

util.inherits(LessGenerator, yeoman.generators.Base);

LessGenerator.prototype.askFor = function askFor() {

  if (!this.options.nested) {

    // sub generator was called by user from console

    var prompts = [
      {
        name: 'obj_name',
        message: 'What do you want to call this less file?',
        default: 'My Less'
      }
    ];

    var done = this.async();
    this.prompt(prompts, function (answers) {
      this.slug = this._.slugify(answers.obj_name);
      this.obj_name = answers.obj_name;
      done();
    }.bind(this));

  } else {

    // sub generator was called internally from main generator

    this.slug = this._.slugify(this.options.obj_name);
    this.obj_name = this.options.obj_name;

  }

};

LessGenerator.prototype.basicStructure = function basicStructure() {
  this.template('style.less', 'src/less/' + this.slug + '.less');
};
