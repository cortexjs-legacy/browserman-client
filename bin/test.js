var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config = require('../lib/config');
var colors = require('colors');

module.exports.execute = function(options) {
	var browserman = new Browserman(config.load());
	browserman.test(options, function(err, results) {
		if (options.verbose) {
			printVerboseTestResult(results)

		} else {
			printTestResult(results)
		}

		browserman.exit();
	})
}

function printTestResult(results) {
	for (var i = results.length - 1; i >= 0; i--) {
		var result = results[i]
		var browser = result.browser;
		var data = result.data;
		var prefix=data.failures.length==0? '\u2713'.green : '\u2717'.red;
		console.log('%s passes: %d failures: %d on %s(%s)',prefix, data.passes.length, data.failures.length, browser.name, browser.version);
	}

}

function printVerboseTestResult(results) {
	for (var i = results.length - 1; i >= 0; i--) {
		var result = results[i]
		var browser = result.browser;
		var data = result.data;
		var prefix=data.failures.length==0? '\u2713'.green : '\u2717'.red;
		console.log('-----------------------------------------------------------');
		console.log('%s passes: %d failures: %d on %s(%s)',prefix, data.passes.length, data.failures.length, browser.name, browser.version);
		console.log('-----------------------------------------------------------');

		for (var j = data.passes.length - 1; j >= 0; j--) {
			console.log('\u2713 '.green + data.passes[j].fullTitle)
		};
		for (var j = data.failures.length - 1; j >= 0; j--) {
			console.log('\u2717 '.red + data.failures[j].fullTitle)
			console.log('	' + data.failures[j].error.red)

		};
		console.log('');
	}

}