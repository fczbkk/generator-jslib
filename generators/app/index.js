var generators = require('yeoman-generator');
var path = require('path');
var humanize = require('string-humanize');


module.exports = generators.Base.extend({

  _copyTemplates: function  (list) {
    for (key in list) {
      var source = this.templatePath(key);
      var target = this.destinationPath(list[key]);
      this.fs.copyTpl(source, target, this.custom_data);
    }
  },


  prepareData: function () {
    var done = this.async();

    var slug = path.basename(process.cwd());
    var project_name = humanize(slug);

    var questions = [
      {
        name: 'slug',
        message: 'Slug, machine readable name of this JS library:',
        default: slug
      },
      {
        name: 'project_name',
        message: 'Human readable name of this JS library:',
        default: project_name
      },
      {
        name: 'description',
        message: 'Describe your JS library in one or two sentences:',
        default: project_name
      },
      {
        name: 'github_account',
        message: 'GitHub account:',
        default: 'fczbkk'
      },
      {
        name: 'publish_to_npm',
        message: 'Will you publish this library to NPM?',
        default: false,
        type: 'confirm'
      },
      {
        when: function (response) {return response.publish_to_npm;},
        name: 'is_scoped_npm',
        message: 'Should the package be scoped?',
        default: true,
        type: 'confirm'
      }
    ];

    this.prompt(questions, function (answers) {
      this.custom_data = answers;
      this.custom_data.package_name = answers.is_scoped_npm
        ? '@' + answers.github_account + '/' + answers.slug
        : answers.slug;
      this.custom_data.publish_command = answers.is_scoped_npm
        ? 'npm publish'
        : 'npm publish  --access=public';
      done();
    }.bind(this));

  },


  createMeta: function () {
    this._copyTemplates({
      '_babelrc': '.babelrc',
      '_editorconfig': '.editorconfig',
      '_eslintrc.root.json': '.eslintrc.json',
      '_gitignore': '.gitignore',
      '_npmignore': '.npmignore',
      '_package.json': 'package.json',
      '_travis.yml': '.travis.yml',
      'CHANGELOG.md': 'CHANGELOG.md',
      'karma.conf.js': 'karma.conf.js',
      'LICENSE': 'LICENSE',
      'README.md': 'README.md'
    });
  },


  createSrc: function () {
    this._copyTemplates({
      'src.js': 'src/index.js'
    });
  },


  createTest: function () {
    this._copyTemplates({
      'test.js': 'test/index.spec.js',
      '_eslintrc.test.json': 'test/.eslintrc.json',
    });
  },


  installDependencies: function () {
    var modules_list = [
      "babel-cli",
      "babel-loader",
      "babel-plugin-transform-object-assign",
      "babel-preset-es2015",
      "conventional-changelog-cli",
      "documentation",
      "eslint",
      "eslint-loader",
      "jasmine-core",
      "karma",
      "karma-coverage",
      "karma-jasmine",
      "karma-mocha-reporter",
      "karma-phantomjs-launcher",
      "karma-webpack",
      "mocha",
      "phantomjs-prebuilt",
      "rimraf",
      "webpack"
    ];
    this.npmInstall(modules_list, {saveDev: true});
  }


});
