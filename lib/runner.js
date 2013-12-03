
function getRunner(grunt) {

	var tsd = require('tsd');

	function reinstall(file, options, callback) {
		//var src = path.resolve(file.src);
		tsd.getAPI(options.config, grunt.verbose);

		callback();

		/*return tsd.run().then(function () {
		 restore();
		 callback();
		 }, function (err) {
		 restore();
		 callback(err);
		 });*/
	}

	return {
		reinstall: reinstall
	};
}

module.exports = {
	getRunner: getRunner
};
