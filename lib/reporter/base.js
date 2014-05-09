var colors = require('colors');
var sf = require('string-format');
var fs = require('fs');
var config = require('../config.js');

exports.report = function(test, options) {
	test.on('done', function(result) {
		if (options.verbose) {
			printVerboseResult(result)
		} else {
			printResult(result)
		}
		if (result.screenshot) {
			var browser = result.browser;
			saveScreenshot({
				screenshot: result.screenshot,
				title: '{name}({version}-{os})'.format(browser)
			});
		}
	}).on('error', function(err) {
		console.log(err.message);
	}).on('complete', function() {
		process.exit(0);
	});
}

function printResult(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('%s passes: %d failures: %d on %s %s / %s', prefix, data.passes.length, data.failures.length, browser.name, browser.version, browser.os);
}

function printVerboseResult(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('-----------------------------------------------------------'.rainbow);
	console.log('%s passes: %d failures: %d on %s %s / %s', prefix, data.passes.length, data.failures.length, browser.name, browser.version, browser.os);
	console.log('-----------------------------------------------------------'.rainbow);
	for (var j = data.passes.length - 1; j >= 0; j--) {
		console.log('\u2713 '.green + data.passes[j].fullTitle)
	};
	for (var j = data.failures.length - 1; j >= 0; j--) {
		console.log('\u2717 '.red + data.failures[j].fullTitle.red)
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