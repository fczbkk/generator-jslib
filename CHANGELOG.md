<a name="3.7.5"></a>
## [3.7.5](https://github.com/fczbkk/generator-jslib/compare/v3.7.4...v3.7.5) (2017-01-17)


### Bug Fixes

* add `webpack.config.js` when creating files ([52b6c06](https://github.com/fczbkk/generator-jslib/commit/52b6c06))
* do not ignore build files when not publishing to NPM ([f627eba](https://github.com/fczbkk/generator-jslib/commit/f627eba))
* remove misleading space from readme ([86a5004](https://github.com/fczbkk/generator-jslib/commit/86a5004))



<a name="3.7.4"></a>
## [3.7.4](https://github.com/fczbkk/generator-jslib/compare/v3.7.3...v3.7.4) (2016-09-19)



<a name="3.7.3"></a>
## [3.7.3](https://github.com/fczbkk/generator-jslib/compare/v3.7.2...v3.7.3) (2016-09-18)


### Bug Fixes

* add `cross_env` module to dev dependencies ([1f9a8a6](https://github.com/fczbkk/generator-jslib/commit/1f9a8a6))


### Features

* allow `console.log` in sample folder ([ae3bdd6](https://github.com/fczbkk/generator-jslib/commit/ae3bdd6))



<a name="3.7.2"></a>
## [3.7.2](https://github.com/fczbkk/generator-jslib/compare/v3.7.1...v3.7.2) (2016-08-29)


### Bug Fixes

* fix publish workflow ([4d053d2](https://github.com/fczbkk/generator-jslib/commit/4d053d2))
* use `postinstall` instead of `prepublish` ([105f6ad](https://github.com/fczbkk/generator-jslib/commit/105f6ad))


### Features

* add `jasmine-diff` reporter ([838a9be](https://github.com/fczbkk/generator-jslib/commit/838a9be))
* separate build for ES5 and ES6 ([41c34c4](https://github.com/fczbkk/generator-jslib/commit/41c34c4))



<a name="3.7.1"></a>
## [3.7.1](https://github.com/fczbkk/generator-jslib/compare/v3.7.0...v3.7.1) (2016-08-21)


### Bug Fixes

* build documentation on `npm version` ([ae28d3b](https://github.com/fczbkk/generator-jslib/commit/ae28d3b))
* overcome the bug in Babel that ignores the `ignore` option in RC ([27acddf](https://github.com/fczbkk/generator-jslib/commit/27acddf))
* prevent circular dependency of npm tasks ([4a4e027](https://github.com/fczbkk/generator-jslib/commit/4a4e027))
* prevent loop when using `npm version` ([4bd016b](https://github.com/fczbkk/generator-jslib/commit/4bd016b))


### Features

* update build workflow, do not include /lib/ in GIT ([6e48bb6](https://github.com/fczbkk/generator-jslib/commit/6e48bb6))



<a name="3.7.0"></a>
# [3.7.0](https://github.com/fczbkk/generator-jslib/compare/v3.6.0...v3.7.0) (2016-07-21)


### Bug Fixes

* copy .eslintrc.json files to proper locations ([ada301c](https://github.com/fczbkk/generator-jslib/commit/ada301c))
* correct URLs of badges in readme ([9e4c0ae](https://github.com/fczbkk/generator-jslib/commit/9e4c0ae))


### Features

* add npm prune and install to build workflow ([0cf17b8](https://github.com/fczbkk/generator-jslib/commit/0cf17b8))



<a name="3.6.0"></a>
# [3.6.0](https://github.com/fczbkk/generator-jslib/compare/v3.5.0...v3.6.0) (2016-07-20)


### Features

* add support for sample page ([a54e9c7](https://github.com/fczbkk/generator-jslib/commit/a54e9c7))



<a name="3.5.0"></a>
# [3.5.0](https://github.com/fczbkk/generator-jslib/compare/v3.4.1...v3.5.0) (2016-07-19)


### Features

* add "How to use" section in readme ([ac9e117](https://github.com/fczbkk/generator-jslib/commit/ac9e117))
* add banners ([2afc565](https://github.com/fczbkk/generator-jslib/commit/2afc565))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/fczbkk/generator-jslib/compare/v3.4.0...v3.4.1) (2016-06-03)


### Bug Fixes

* generate correct publish command when scoped ([1b6d1da](https://github.com/fczbkk/generator-jslib/commit/1b6d1da))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/fczbkk/generator-jslib/compare/v3.3.1...v3.4.0) (2016-06-03)


### Bug Fixes

* enable `console` during development ([b47f2bb](https://github.com/fczbkk/generator-jslib/commit/b47f2bb))


### Features

* add support for scoped packages ([eaa3ef5](https://github.com/fczbkk/generator-jslib/commit/eaa3ef5))



<a name="3.3.1"></a>
## [3.3.1](https://github.com/fczbkk/generator-jslib/compare/v3.3.0...v3.3.1) (2016-05-26)


### Bug Fixes

* add `.babelrc` to `.npmignore` ([a6ee77a](https://github.com/fczbkk/generator-jslib/commit/a6ee77a))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/fczbkk/generator-jslib/compare/v3.2.0...v3.3.0) (2016-05-25)


### Bug Fixes

* eslint workflow ([7301a02](https://github.com/fczbkk/generator-jslib/commit/7301a02))


### Features

* allow custom GitHub account ([2d74f7b](https://github.com/fczbkk/generator-jslib/commit/2d74f7b))
* set package as private when not publishing to NPM ([04901fa](https://github.com/fczbkk/generator-jslib/commit/04901fa))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/fczbkk/generator-jslib/compare/v3.1.0...v3.2.0) (2016-05-21)


### Features

* add ESLint ([71932c2](https://github.com/fczbkk/generator-jslib/commit/71932c2))
* make publish to NPM optional ([1657809](https://github.com/fczbkk/generator-jslib/commit/1657809))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/fczbkk/generator-jslib/compare/v2.0.0...v3.1.0) (2016-05-16)


### Bug Fixes

* use description instead of name in package.json ([5ee5793](https://github.com/fczbkk/generator-jslib/commit/5ee5793))


### Features

* add .editorconfig ([e658096](https://github.com/fczbkk/generator-jslib/commit/e658096))
* add `.npmignore` ([a37438e](https://github.com/fczbkk/generator-jslib/commit/a37438e))
* add coverage reporter ([969c52a](https://github.com/fczbkk/generator-jslib/commit/969c52a))



