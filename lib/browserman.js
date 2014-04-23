var logger = require('./logger');
var io = require('socket.io-client');

function Browserman(options) {
	var options = options || {};
	this.host = options.host || '127.0.0.1';
	this.port = options.port || 9000;
	this.serverAddress = 'http://' + this.host + ':' + this.port + '/client';
}

Browserman.prototype.list = function(cb) {

	var socket = io.connect(this.serverAddress,{
		'reconnect':false,
		'force new connection':true
	});

	socket.on('connect', function() {

		socket.emit('query', {
			name: '',
			version: '*'
		});

		socket.on('queryresult', function(workers) {
			return cb(null, workers.map(function(worker) {
				return {
					name: worker.browser.name,
					version: worker.browser.version
				}
			}));
		})

	});

	socket.on('disconnect', function() {

	});

	socket.on('error', function() {
		return cb(new Error('connection error'));
	})

}


Browserman.prototype.test = function(order, cb) {

	var socket = io.connect(this.serverAddress);

	socket.on('connect', function() {

		socket.emit('query', order.requirement);

		var ongoings = 0;
		var results = [];

		socket.on('queryresult', function(workers) {
			if(!workers || workers.length===0){
				return cb(new Error('no compatible browser'))
			}

			for (var i = workers.length - 1; i >= 0; i--) {
				var worker = workers[i];
				socket.emit('test', {
					url: order.url,
					requirement: {
						workerId: worker.workerId
					}
				});
			};
			ongoings = workers.length;
		})

		socket.on('done', function(result) {

			results.push(result);

			if (--ongoings == 0) {

				return cb(null,results.map(function(result) {
					return {
						browser: result.browser,
						data: result.data
					}
				}))

			}
		})

		socket.on('disconnect', function() {

		});

	});
}

Browserman.prototype.exit = function() {
	process.exit(0);
};

module.exports = Browserman;