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
      }
    ];

    this.prompt(questions, function (answers) {
      this.custom_data = answers;
      done();
    }.bind(this));

  },


  createMeta: function () {
    this._copyTemplates({
      '_gitignore': '.gitignore',
      '_package.json': 'package.json',
      '_babelrc': '.babelrc',
      'karma.conf.js': 'karma.conf.js',
      'webpack.config.js': 'webpack.config.js',
      'README.md': 'README.md',
      'CHANGELOG.md': 'CHANGELOG.md',
      'LICENSE': 'LICENSE'
    });
  },


  createSrc: function () {
    this._copyTemplates({
      'src.js': 'src/index.js'
    });
  },


  createTest: function () {
    this._copyTemplates({
      'test.js': 'test/index.spec.js'
    });
  },


  createTasks: function () {
    this._copyTemplates({
      'tasks/build-library.js': 'tasks/build-library.js',
      'tasks/bump.js': 'tasks/bump.js',
      'tasks/changelog.js': 'tasks/changelog.js',
      'tasks/check-files.js': 'tasks/check-files.js',
      'tasks/cleanup.js': 'tasks/cleanup.js',
      'tasks/execute-command.js': 'tasks/execute-command.js',
      'tasks/git.js': 'tasks/git.js',
      'tasks/publish.js': 'tasks/publish.js',
      'tasks/release.js': 'tasks/release.js',
    });
  },


  installDependencies: function () {
    var modules_list = [
      'async',
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-object-assign',
      'babel-preset-es2015',
      'colors',
      'concat-stream',
      'conventional-changelog',
      'find-files-by-content',
      'fs-extra',
      'glob',
      'inquirer',
      'jasmine-core',
      'karma',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'phantomjs',
      'semver',
      'uglify-js',
      'webpack'
    ]
    this.npmInstall(modules_list, {saveDev: true});
  }


});
