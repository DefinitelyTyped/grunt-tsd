/*jshint -W064*/
var chai = require('chai');
var assert = chai.assert;

var path = require('path');
var Q = require('q');
var FS = require('q-io/fs');
var differ = require('unfunk-diff');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function testName(filename) {
	return path.basename(path.dirname(filename)) + '/' + path.basename(filename);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function createBulkCompare(grunt) {
	var queue = [];

	function getQueue() {
		return queue.slice(0);
	}

	function directory(one, two, label) {
		queue.push({
			one: one,
			two: two,
			label: label
		});
	}

	function getReducer (dir) {
		dir = dir.split(path.sep).join('/');

		return function reducer (memo, value) {
			value = value.split(path.sep).join('/');
			if (value.indexOf(dir) === 0) {
				value = value.substring(dir.length);
			}
			if (value.length > 0) {
				memo.push(value);
			}
			return memo;
		};
	}

	function runTest() {
		return Q.all(queue.map(function (item) {
			return Q.all([
				FS.listTree(item.one),
				FS.listTree(item.two)
			]).spread(function (oneTree, twoTree) {
				item.oneTree = oneTree.reduce(getReducer(item.one), []);
				item.twoTree = twoTree.reduce(getReducer(item.two), []);

				item.oneTree.sort();
				item.twoTree.sort();

				return Q.resolve().then(function () {
					assert.deepEqual(item.oneTree, item.twoTree);
				}).fail(function (err) {
					grunt.log.writeln(differ.ansi(err.actual, err.expected));
					throw err;
				});
			});
		}));
	}

	return {
		runTest: runTest,
		getQueue: getQueue,
		directory: directory
	};
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = {
	testName: testName,
	createBulkCompare: createBulkCompare
};
