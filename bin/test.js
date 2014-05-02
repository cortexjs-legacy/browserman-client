var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config = require('../lib/config');
var colors = require('colors');
var fs = require('fs');
var cp = require('child_process');

module.exports.execute = function(options) {
	var browserman = new Browserman(config.load());
	var test = browserman.test(options);
	test.on('data', function(result) {
		if (options.verbose) {
			printVerboseResult(result)
		} else {
			printResult(result)
		}
		if (result.screenshot) {
			var browser = result.browser;
			saveScreenshot({
				screenshot: result.screenshot,
				title: browser.name + '(' + browser.version + ')'
			});
		}
	}).on('error', function(err) {
		console.log(err.message);
	}).on('end', function() {
		process.exit(0);
	})
}

function printResult(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('%s passes: %d failures: %d on %s(%s)', prefix, data.passes.length, data.failures.length, browser.name, browser.version);
}

function printVerboseResult(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('-----------------------------------------------------------');
	console.log('%s passes: %d failures: %d on %s(%s)', prefix, data.passes.length, data.failures.length, browser.name, browser.version);
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

function saveScreenshot(options) {
	var html = '<html><body>' + options.screenshot + '</body></html>';
	var path = config.home() + '/' + options.title + '.html';
	fs.writeFileSync(path, html);
	console.log('  save screenshot to: %s', path);
	console.log('');
}