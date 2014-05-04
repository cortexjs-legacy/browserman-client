var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');
var config = require('../lib/config');
var colors = require('colors');

module.exports.execute = function() {
	
	var browserman = new Browserman(config.load());
	var list= browserman.list();
	list.on('done', function(workers) {
		if (!workers || workers.length == 0) {
			console.log('no worker found');
		}
		console.log('-------------------------------------------');
		console.log('%s workers found', workers.length);
		console.log('-------------------------------------------');

		workers.forEach(function(worker){
			console.log('%s %s / %s', worker.name, worker.version,worker.os);
		});
		
	}).on('error',function(err){
		console.log(err.message);
	}).on('complete', function() {
		process.exit(0);
	})
}