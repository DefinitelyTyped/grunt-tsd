
/*jshint -W064*/
var path = require('path');
var Q = require('q');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//for safety
function promiseDoneMistake() {
	throw new Error('don\'t use a done() callback when using it.eventually()');
}

//monkey patch
it.eventually = function eventually(expectation, assertion) {
	it(expectation, function (done) {
		Q(assertion(promiseDoneMistake)).done(function () {
			done();
		}, function (err) {
			done(err);
		});
	});
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function testName(filename) {
	return path.basename(path.dirname(filename)) + '/' +  path.basename(filename);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = {
	testName: testName
};
