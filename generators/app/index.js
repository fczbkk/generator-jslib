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
      '_babelrc': '.babelrc',
      '_gitignore': '.gitignore',
      '_package.json': 'package.json',
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
      'test.js': 'test/index.spec.js'
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
      "jasmine-core",
      "karma",
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
