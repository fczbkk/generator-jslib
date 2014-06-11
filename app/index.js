// TODO optional sample page with local server

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var JsLibGenerator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
};

util.inherits(JsLibGenerator, yeoman.generators.Base);

JsLibGenerator.prototype.askFor = function askFor() {

  var prompts = [
    {
      name: 'project_name',
      message: 'What do you want to call this JS library?',
      default: 'My JS Library'
    },
    {
      name: 'project_description',
      message: 'Describe your JS library.',
      default: 'JS library that does something.'
    },
    {
      name: 'include_less',
      message: 'Will you use LESS?',
      type: 'confirm',
      default: false
    }
  ];

  var done = this.async();
  this.prompt(prompts, function (answers) {
    this.slug = this._.slugify(answers.project_name);
    this.project_name = answers.project_name;
    this.project_description = answers.project_description;
    this.include_less = answers.include_less;
    done();
  }.bind(this));

};

JsLibGenerator.prototype.basicStructure = function basicStructure() {
  // general project files
  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.coffee', 'Gruntfile.coffee');
  this.template('_gitignore', '.gitignore');
  this.template('_README.md', 'README.md');
  this.template('_UNLICENSE', 'UNLICENSE');

  // source code
  this.mkdir('src');
  this.mkdir('src/coffee');
  if (this.include_less) {
    this.mkdir('src/less');
  }

  // tests
  this.mkdir('test');
  this.mkdir('test/src');
};

JsLibGenerator.prototype.baseObject = function () {

  // CoffeeScript
  this.invoke("jslib:obj", {
    options: {
      nested: true,
      obj_name: this.project_name
    }
  });

  // Less
  if (this.include_less) {
    this.invoke("jslib:less", {
      options: {
        nested: true,
        obj_name: this.project_name
      }
    });
  }

}

JsLibGenerator.prototype.install = function () {
  var done = this.async();
  this.installDependencies({
    callback: done
  });
};
