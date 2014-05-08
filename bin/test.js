var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config = require('../lib/config');

module.exports.execute = function(options) {

	var browserman = new Browserman(config.load());
	var test = browserman.test(options);
	require('../lib/reporter/' + options.reporter).report(test,{
		verbose:options.verbose
	});
}