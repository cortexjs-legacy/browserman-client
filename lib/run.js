var logger = require('./logger');
var io = require('socket.io-client');

exports.execute = function(order) {

	var socket = io.connect('http://127.0.0.1:9000/asker');

	socket.on('connect', function() {
		logger.info('connected');
		logger.info('create order:%s',JSON.stringify(order));
		socket.emit('query',order.requirement);

		socket.on('queryresult', function(workers) {
			logger.info('workers found: %s',JSON.stringify(workers));
			for (var i = workers.length - 1; i >= 0; i--) {
				var worker=workers[i];
				socket.emit('test',{
					url:order.url,
					requirement:{
						workerId:worker.workerId
					}
				});
			};
		})

		socket.on('done', function(data) {
			logger.info('test done: %s',JSON.stringify(data));
		})

		socket.on('disconnect', function(){
			logger.info('disconnected');
		});

	});

}