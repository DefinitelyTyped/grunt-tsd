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

	var helper = require('./test/helper');
	var compare = helper.createBulkCompare(grunt);

	gtx.define('tester', function (macro, id) {
		var testPath = 'test/modules/' + id + '/';

		macro.add('clean', [testPath + 'tmp/**/*']);

		macro.add('copy', {
			options: {
				config: testPath + 'fixtures/**'
			},
			files: [
				{expand: true, cwd: testPath + 'fixtures', src: ['**'], dest: testPath + 'tmp/'}
			]
		});

		macro.add('tsd', gtx.extendObject({
			options: {
				config: testPath + 'tmp/tsd.json'
			}
		}, {
			options: macro.getParam('options')
		}));

		macro.call(function () {
			compare.directory(testPath + 'tmp/typings', testPath + 'expected/typings', id);
		});
	});

	gtx.create('reinstall_base', 'tester', {
		options: {
			command: 'reinstall'
		}
	}, ['pass']);

	gtx.create('reinstall_latest', 'tester', {
		options: {
			command: 'reinstall',
			latest: true,
			opts: {
			}
		}
	}, ['pass']);
	
	gtx.create('link', 'tester', {
		options:{
			command: 'link',
			opts:{}
		}
	}, ['pass']);

	gtx.alias('pass', ['gtx-group:pass']);
	gtx.alias('fail', []);

	gtx.call('finalise', function () {
		var done = this.async();
		compare.runTest().then(function () {
			done(true);
		}, function (err) {
			grunt.log.fail(err);
			done(false);
		});
	});

	gtx.alias('prep', ['clean', 'jshint']);
	gtx.alias('build', ['prep']);
	gtx.alias('test', ['build', 'pass', 'finalise', 'continueOn', 'fail', 'continueOff']);

	gtx.alias('default', ['test']);

	gtx.finalise();
};
