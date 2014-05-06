var colors = require('colors');
var fs = require('fs');

exports.printResult = function(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('%s passes: %d failures: %d on %s %s / %s', prefix, data.passes.length, data.failures.length, browser.name, browser.version, browser.os);
}

exports.printVerboseResult = function(result) {
	var browser = result.browser;
	var data = result.data;
	var prefix = data.failures.length == 0 ? '\u2713'.green : '\u2717'.red;
	console.log('-----------------------------------------------------------');
	console.log('%s passes: %d failures: %d on %s %s / %s', prefix, data.passes.length, data.failures.length, browser.name, browser.version, browser.os);
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

exports.saveScreenshot = function(options) {
	var html = '<html><body>' + options.screenshot + '</body></html>';
	var path = config.home() + '/' + options.title + '.html';
	fs.writeFileSync(path, html);
	console.log('  save screenshot to: %s', path);
	console.log('');
}