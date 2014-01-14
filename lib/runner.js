/*jshint -W098*/

function getRunner(grunt) {
	var path = require('path');
	var tsd = require('tsd');
	var Q = require('q');

	function getAPI(options) {
		grunt.log.writeln('-> config: ' + options.config);
		var api = tsd.getAPI(options.config, grunt.option('verbose'));
		if (options.cacheDir) {
			grunt.log.writeln('cacheDir: ' + options.cacheDir);
			api.context.paths.cacheDir = path.resolve(options.cacheDir);
		}
		return api;
	}

	function reinstall(options) {
		var api = getAPI(options);

		return api.readConfig(options.config, (!!options.config)).then(function () {
			var opts = tsd.Options.fromJSON(options.opts);

			if (options.latest) {
				var query = new tsd.Query();
				api.context.config.getInstalled().forEach(function (inst) {
					var def = tsd.Def.getFrom(inst.path);
					query.addNamePattern(def.project + '/' + def.name);
				});
				query.versionMatcher = new tsd.VersionMatcher('latest');

				return api.select(query, opts).then(function (selection) {
					opts.overwrite = true;
					opts.saveToConfig = true;
					return api.install(selection, opts);
				});
			}
			return api.reinstall(opts);
		});
	}

	return {
		getAPI: getAPI,
		commands: {
			reinstall: reinstall
		}
	};
}

module.exports = {
	getRunner: getRunner
};
