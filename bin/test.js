var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config=require('../lib/config');

module.exports.execute = function(options) {
	browserman = new Browserman(config.load());
	browserman.test(options,
		function(err, results) {
			for (var i = results.length - 1; i >= 0; i--) {
				printTestResult(results[i])
			}
			browserman.exit();
		}
	)
}

function printTestResult(result) {
	var browser = result.browser;
	var data = result.data;
	logger.info('---------------------------------------------------------------');
	logger.info('passes:%d failures:%d on %s(%s)', data.passes.length, data.failures.length, browser.name, browser.version);
	logger.info('---------------------------------------------------------------');

	for (var i = data.passes.length - 1; i >= 0; i--) {
		logger.pass(data.passes[i].fullTitle)
	};
	for (var i = data.failures.length - 1; i >= 0; i--) {
		logger.fail(data.failures[i].fullTitle)
	};
	logger.info('');

}