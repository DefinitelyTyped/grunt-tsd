
var path = require('path');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*
//for safety
function promiseDoneMistake() {
	throw new Error('don\'t use a done() callback when using it.eventually()');
}

//monkey patch
it.eventually = function eventually(expectation, assertion) {
	/*jshint -W064*   /
	it(expectation, function (done) {
		Q(assertion(promiseDoneMistake)).done(function () {
			done();
		}, function (err) {
			done(err);
		});
	});
};*/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function testName(filename) {
	return path.basename(path.dirname(filename)) + '/' +  path.basename(filename);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = {
	testName: testName
};
