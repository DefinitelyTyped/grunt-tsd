/*
 * grunt-tsd
 * https://github.com/DefinitelyTyped/grunt-tsd
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	var gtx = require('gruntfile-gtx').wrap(grunt);
	gtx.loadAuto();
	gtx.loadTasks('tasks');

	gtx.config({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: gtx.readJSON('.jshintrc', {
				reporter: './node_modules/jshint-path-reporter'
			}),
			support: ['Gruntfile.js', 'tasks/**/*.js', 'test/*.js', 'lib/**/*.js']
		},
		clean: {
			tmp: ['tmp/**/*', 'test/tmp/**/*'],
			dump: ['test/**/dump']
		},
		mochaTest: {
			options: {
				reporter: 'mocha-unfunk-reporter',
				timeout: 3000
			},
			specs: ['test/specs/*.js']
		},
		tsd: {
			reinstall: {
				options: {
					config: './tsd.json',
					overwrite: true
				}
			}
		}
	});

	gtx.define('tester', function(macro, id) {
		var testPath = 'test/modules/' + id + '/';
		macro.add('clean', [testPath + 'tmp/**/*']);
		macro.add('jshint', {
			src: [testPath + 'src/**/*.js']
		});
		macro.add('tsd', {
			options: {
				config: testPath + '/tsd.json'
			}
		});
		macro.add('mochaTest', {
			options: {
				timeout: macro.getParam('timeout', 3000)
			},
			src: [testPath + 'tmp/**/*.test.js']
		});
	});

	gtx.create('reinstall', 'tester', {

	});

	gtx.alias('pass', []);
	gtx.alias('fail', []);

	gtx.alias('prep', ['clean', 'jshint']);
	gtx.alias('build', ['prep']);
	gtx.alias('test', ['build', 'pass', 'continueOn', 'fail', 'continueOff']);

	gtx.alias('default', ['test']);

	gtx.finalise();
};
