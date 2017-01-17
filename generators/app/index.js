var generators = require('yeoman-generator');
var path = require('path');
var humanize = require('string-humanize');
var pascalCase = require('pascal-case');


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
      },
      {
        name: 'include_sample',
        message: 'Include sample page?',
        default: false,
        type: 'confirm'
      }
    ];

    this.prompt(questions, function (answers) {
      this.custom_data = answers;
      this.custom_data.object_name = pascalCase(answers.slug);
      this.custom_data.package_name = answers.is_scoped_npm
        ? '@' + answers.github_account + '/' + answers.slug
        : answers.slug;
      this.custom_data.publish_command = answers.is_scoped_npm
        ? 'npm publish --access=public'
        : 'npm publish';
      done();
    }.bind(this));

  },


  createMeta: function () {
    var files_list = {
      '_babelrc': '.babelrc',
      '_editorconfig': '.editorconfig',
      '_eslintrc.root.json': '.eslintrc.json',
      '_gitignore': '.gitignore',
      '_package.json': 'package.json',
      '_travis.yml': '.travis.yml',
      'CHANGELOG.md': 'CHANGELOG.md',
      'karma.conf.js': 'karma.conf.js',
      '_webpack.config.js': 'webpack.config.js',
      'LICENSE': 'LICENSE',
      'README.md': 'README.md'
    };
    if (this.custom_data.publish_to_npm) {
      files_list['_npmignore'] = '.npmignore';
    }
    this._copyTemplates(files_list);
  },


  createSrc: function () {
    this._copyTemplates({
      '_eslintrc.src.json': 'src/.eslintrc.json',
      'src.js': 'src/index.js'
    });
  },


  createTest: function () {
    this._copyTemplates({
      'test.js': 'test/index.spec.js',
      '_eslintrc.test.json': 'test/.eslintrc.json',
    });
  },


  createSample: function () {
    if (this.custom_data.include_sample) {
      this._copyTemplates({
        '_eslintrc.sample.json': 'sample/.eslintrc.json',
        '_webpack.sample.js': 'webpack.sample.js',
        'sample.html': 'sample/index.html',
        'sample.css': 'sample/index.css',
        'sample.js': 'sample/index.js'
      });
    }
  },


  installDependencies: function () {
    var modules_list = [
      "babel-cli",
      "babel-loader",
      "babel-plugin-transform-object-assign",
      "babel-preset-es2015",
      "conventional-changelog-cli",
      "cross-env",
      "documentation",
      "eslint",
      "eslint-loader",
      "jasmine-core",
      "karma",
      "karma-coverage",
      "karma-jasmine",
      "karma-jasmine-diff-reporter",
      "karma-mocha-reporter",
      "karma-phantomjs-launcher",
      "karma-webpack",
      "mocha",
      "phantomjs-prebuilt",
      "rimraf",
      "webpack"
    ];

    if (this.custom_data.include_sample) {
      modules_list.push('webpack-dev-server');
    }

    this.npmInstall(modules_list, {saveDev: true});
  }


});
