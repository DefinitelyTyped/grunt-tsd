# grunt-tsd

[![Build Status](https://secure.travis-ci.org/DefinitelyTyped/grunt-tsd.png?branch=master)](http://travis-ci.org/DefinitelyTyped/grunt-tsd) [![NPM version](https://badge.fury.io/js/grunt-tsd.png)](http://badge.fury.io/js/grunt-tsd)

> Grunt plugin to automate [tsd](https://github.com/DefinitelyTyped/tsd/) and TypeScript definition related tasks

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-tsd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tsd');
```

## The "tsd" task       

### Options

```js
grunt.initConfig({
	tsd: {
		refresh: {
			options: {
				// execute a command
				command: 'reinstall',

				//optional: always get from HEAD
				latest: true,

				// optional: specify config file
				config: '../conf/tsd.json',

				// experimental: options to pass to tsd.API
				opts: {
					// props from tsd.Options
				}
			}
		}
	}
})
```

## History

* 0.1.0 - reinstall always resolves dependencies, saves to config/bundle and overwrites 
* 0.0.2 ... 0.0.4 - Updating TSD version to `0.5.6`
* 0.0.1 - First release for TSD `0.5.2`

## Contributing

Contributions are very welcome, please create an Issue before doing something major.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
