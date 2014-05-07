'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ObjGenerator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
};

util.inherits(ObjGenerator, yeoman.generators.Base);

ObjGenerator.prototype.askFor = function askFor() {

  if (!this.options.nested) {

    // sub generator was called by user from console

    var prompts = [
      {
        name: 'obj_name',
        message: 'What do you want to call this object?',
        default: 'My Object'
      }
    ];

    var done = this.async();
    this.prompt(prompts, function (answers) {
      this.slug = this._.slugify(answers.obj_name);
      this.obj_name = this._.classify(answers.obj_name);
      done();
    }.bind(this));

  } else {

    // sub generator was called internally from main generator

    this.slug = this._.slugify(this.options.obj_name);
    this.obj_name = this._.classify(this.options.obj_name);

  }

};

ObjGenerator.prototype.basicStructure = function basicStructure() {
  this.template('object.coffee', 'src/' + this.slug + '.coffee');
  this.template('object.spec.coffee', 'test/src/' + this.slug + '.spec.coffee');
};
