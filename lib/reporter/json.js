var colors = require('colors');
var sf = require('string-format');
var fs = require('fs');

exports.report = function(test,options) {
	var data=[];
	test.on('done', function(result) {
		data.push(result);
	}).on('error', function(err) {
		console.log(err.message);
	}).on('timeout',function(){
		console.log('timeout');
	}).on('complete', function() {
		console.log(JSON.stringify(data));
		process.exit(0);
	});
}
