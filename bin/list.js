var Browserman = require('../lib/browserman');
var logger=require('../lib/logger');

module.exports.execute = function() {

	var browserman = new Browserman();

	browserman.list(function(err, workers) {
		if (err) {
			logger.error(err.message);
			browserman.exit();
		}
		if(!workers || workers.length==0){
			logger.warn('no worker found');
			browserman.exit();
		}
		logger.info('----------------------');
		logger.info('%s workers found',workers.length);
		logger.info('----------------------');

		for (var i = workers.length - 1; i >= 0; i--) {
			logger.info('%s(%s)', workers[i].name, workers[i].version);
		};
		browserman.exit();
	});
}