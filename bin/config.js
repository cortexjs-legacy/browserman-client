var config = require('../lib/config');
var logger=require('../lib/logger');

exports.execute=function(options){
	options.host && config.set('host',options.host);
	options.port && config.set('port',options.port);
	logger.info('config updated to: %s',JSON.stringify(config.load()));
}