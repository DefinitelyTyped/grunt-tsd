/*
 * grunt-tsd
 * https://github.com/DefinitelyTyped/grunt-tsd
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

var runner = require('../lib/runner');

module.exports = function (grunt) {

	function promised(promise, done) {
		promise.done(function () {
			done(true);
		}, function (err) {
			grunt.log.fail('error!');
			grunt.log.fail(err.stack);
			done(false);
		});
	}

	grunt.registerMultiTask('tsd', 'Run TSD to work with TypeScript definitions', function () {
		var run = runner.getRunner(grunt);
		var options = this.options({
			command: null
		});
		var done = this.async();

		if (!(options.command in run.commands)) {
			grunt.log.fail('error missing command: ' + options.command);
			done(false);
			return;
		}
		var command = run.commands[options.command];

		promised(command(options), done);
	});
};
