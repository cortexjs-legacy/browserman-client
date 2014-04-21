var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config=require('../lib/config');
var colors=require('colors');

module.exports.execute = function(options) {
	var browserman = new Browserman(config.load());
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
	console.log('-----------------------------------------------------------');
	console.log('passes: %d failures: %d on %s(%s)', data.passes.length, data.failures.length, browser.name, browser.version);
	console.log('-----------------------------------------------------------');

	for (var i = data.passes.length - 1; i >= 0; i--) {
		console.log('\u2713 '.green + data.passes[i].fullTitle)
	};
	for (var i = data.failures.length - 1; i >= 0; i--) {
		console.log('\u2717 '.red + data.failures[i].fullTitle)
		console.log('	'+ data.failures[i].error.red)

	};
	console.log('');

}