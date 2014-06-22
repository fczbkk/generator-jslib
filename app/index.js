'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var GithubApi = require('github');


var github = new GithubApi({
  version: '3.0.0'
});

var github_token = process.env.GITHUB_TOKEN
if (github_token) {
  github.authenticate({
    type: 'oauth',
    token: github_token
  });
}

function getGithubUserInfo (username, callback) {
  github.user.getFrom({
    user: username
  }, function (error, response) {
    if (error) {
      throw new Error('Could not get info from GitHub profile of ' + username);
    }
    callback(response);
  });
}


var JsLibGenerator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
};

util.inherits(JsLibGenerator, yeoman.generators.Base);

JsLibGenerator.prototype.askFor = function askFor() {

  var directory_name = path.basename(process.cwd());
  var default_project_name = this._.humanize(directory_name);

  var prompts = [
    {
      name: 'project_name',
      message: 'What do you want to call this JS library?',
      default: default_project_name
    },
    {
      name: 'project_description',
      message: 'Describe your JS library.',
      default: default_project_name
    },
    {
      name: 'include_less',
      message: 'Will you use LESS?',
      type: 'confirm',
      default: false
    },
    {
      name: 'include_bower',
      message: 'Would you like to support Bower?',
      type: 'confirm',
      default: false
    },
    {
      name: 'github_username',
      message: 'What is your username at GitHub?',
      default: 'fczbkk'
    }
  ];

  var done = this.async();
  this.prompt(prompts, function (answers) {
    this.slug = this._.slugify(answers.project_name);
    this.project_name = answers.project_name;
    this.project_description = answers.project_description;
    this.include_less = answers.include_less;
    this.include_bower = answers.include_bower;
    this.github_username = answers.github_username;

    // try to get user info from GitHub
    getGithubUserInfo(this.github_username, function (response) {
      this.github_home = response.html_url;
      this.github_name = response.name;
      this.github_email = response.email;
      this.author_info = this.github_name + ' <' + this.github_email + '> (' + this.github_home + ')';
      this.project_url = this.github_home + '/' + this.slug;
      done();
    }.bind(this));

  }.bind(this));

};

JsLibGenerator.prototype.basicStructure = function basicStructure() {
  // general project files
  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.coffee', 'Gruntfile.coffee');
  this.template('_gitignore', '.gitignore');
  this.template('_README.md', 'README.md');
  this.template('_UNLICENSE', 'UNLICENSE');

  // Bower
  if (this.include_bower) {
    this.template('_bower.json', 'bower.json');
  }
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

  function doInvoke(generator, submodule_name) {
    generator.invoke("jslib:" + submodule_name, {
      options: {
        nested: true,
        obj_name: generator.project_name
      }
    });
  }

  // CoffeeScript
  doInvoke(this, 'obj');

  // Less
  if (this.include_less) {
    doInvoke(this, 'less');
  }

}

JsLibGenerator.prototype.install = function () {
  var done = this.async();
  this.installDependencies({
    callback: done
  });
};
