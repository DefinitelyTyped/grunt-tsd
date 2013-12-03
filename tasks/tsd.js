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

	grunt.registerMultiTask('tsd', 'Run TSD to install TypeScript definitions', function () {
		var run = runner.getRunner(grunt);

		var options = this.options({});
		var done = this.async();
		var files = [];

		var fileCount = 0;
		var success = 0;
		var failed = 0;

		//flatten list for sanity
		grunt.util._.each(this.files, function (f) {
			grunt.util._.each(f.src, function (filePath) {
				if ( !grunt.file.exists(filePath)) {
					grunt.log.writeln('file does not exist '.warn + filePath);
					return false;
				}
				fileCount++;
				files.push({src: filePath, options: options});
			});
		});

		if (fileCount === 0) {
			grunt.log.warn('zero files selected');
			grunt.log.writeln();
			done(false);
			return;
		}

		grunt.util.async.forEach(files, function (file, callback) {
			run.reinstall(file, options, function (err) {
				if (err) {
					grunt.log.writeln(file.src.red);
					grunt.fail.warn(err);
					failed++;
				}
				else {
					grunt.log.writeln(file.src);
					success++;
				}
				callback();
			});

		}, function (err) {
			grunt.log.writeln();
			if (err) {
				grunt.log.error('error running tsd');
				if (err) {
					grunt.log.error(err);
				}
				grunt.log.writeln();
				done(false);
			}
			else {
				if (success < fileCount || fileCount === 0) {
					grunt.log.error('tsd ' + ('completed ' + success).yellow + ' and ' + ('failed ' + failed).red + ' of ' + (fileCount + ' total').green);
					grunt.log.writeln();
					done(false);
				}
				else {
					grunt.log.ok('tsd ' + ('completed ' + success).green + ' of ' + (fileCount + ' total').green);
					done();
				}
			}
		});
	});
};
