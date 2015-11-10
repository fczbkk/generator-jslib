'use strict'

path = require 'path'
yeoman = require 'yeoman-generator'
humanize = require 'string-humanize'
pascalCase = require 'pascal-case'
slugify = require 'slug'
async = require 'async'
inquirer = require 'inquirer'


# GITHUB

GithubApi = require 'github'
github = new GithubApi version: '3.0.0'
github_token = process.env.GITHUB_TOKEN

if github_token
  github.authenticate type: oauth, token: github_token


# requests user info from GitHub
getGithubUserInfo = (username, callback) ->
  github.user.getFrom {user: username}, (error, response) ->
    if error?
      throw new Error "Could not get info from GitHub profile '#{username}'."
    else
      callback response


askProjectQuestions = (callback) ->
  dir_name = path.basename process.cwd()
  project_name = humanize dir_name
  object_name = pascalCase dir_name

  questions = [

    {
      name: 'slug'
      message: 'Slug, machine readable name of this JS library:'
      default: dir_name
    }

    {
      name: 'name'
      message: 'Human readable name of this JS library:'
      default: project_name
    }

    {
      name: 'description'
      message: 'Describe your JS library in one or two sentences:'
      default: project_name
    }

    {
      name: 'license'
      message: 'What license would you like to use?'
      type: 'list'
      choices: ['MIT', 'UNLICENSE', 'BSD', 'none']
      default: 'MIT'
      store: true
    }

    {
      name: 'bower'
      message: 'Include Bower in this project?'
      type: 'confirm'
      default: true
    }

    {
      name: 'gh_username'
      message: 'What is your username at GitHub?'
      default: 'fczbkk'
    }

  ]

  inquirer.prompt questions, callback


module.exports = yeoman.generators.Base.extend

  prompting: ->
    done = @async()
    @props = {}

    askProjectQuestions (answers) =>
      getGithubUserInfo answers.gh_username, (gh) =>
        @props =

          project:
            slug: answers.slug
            name: answers.name
            description: answers.description
            obj_name: pascalCase answers.slug

          author:
            name: gh.name
            email: gh.email
            url: gh.html_url

          include:
            bower: answers.bower

          license:
            type: answers.license
            filename:
              if answers.license is 'UNLICENSE'
              then 'UNLICENSE'
              else 'LICENSE'

          github:
            home_url: gh.html_url
            project_url: "#{gh.html_url}/#{answers.slug}"
            repo_url: "git@github.com:#{answers.gh_username}/#{answers.slug}"

        done()


  writing: ->
    templates =
      '_gitignore': '.gitignore'
      '_package.json': 'package.json'
      'Gruntfile.coffee': 'Gruntfile.coffee'
      'CHANGELOG.md': 'CHANGELOG.md'
      'README.md': 'README.md'
      'lib.coffee': "src/lib/#{@props.project.slug}.coffee"
      'test.coffee': "src/test/#{@props.project.slug}.spec.coffee"

    if @props.include.bower
      templates['_bower.json'] = 'bower.json'

    for source, target of templates
      @fs.copyTpl (@templatePath source), (@destinationPath target), @props

    # add selected license to the root folder
    unless @props.license.type is 'none'
      src = @templatePath "license/#{@props.license.type}"
      dest = @destinationPath @props.license.filename
      @fs.copyTpl src, dest, @props


  install: ->

    modules_list = [
      'coffeelint'
      'grunt-banner'
      'grunt-bump'
      'grunt-coffeelint'
      'grunt-contrib-clean'
      'grunt-contrib-coffee'
      'grunt-contrib-copy'
      'grunt-contrib-jasmine'
      'grunt-contrib-watch'
      'grunt-conventional-changelog'
      'grunt-files-check'
      'grunt-karma'
      'grunt-prompt'
      'grunt-shell'
      'grunt'
      'jasmine-core'
      'karma-chrome-launcher'
      'karma-jasmine'
      'karma-mocha-reporter'
      'karma-phantomjs-launcher'
      'karma'
      'load-grunt-tasks'
      'phantomjs'
      'semver'
    ]

    @npmInstall modules_list, {saveDev: true}
