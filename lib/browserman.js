var io = require('socket.io-client');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var logger = require('./logger');

function Browserman(options) {
	var options = options || {};
	this.host = options.host || '127.0.0.1';
	this.port = options.port || 9000;
	this.serverAddress = 'http://' + this.host + ':' + this.port + '/client';
}

Browserman.prototype.list = function() {
	var emitter = new EventEmitter();

	var socket = io.connect(this.serverAddress, {
		'reconnect': false,
		'force new connection': true
	});

	socket.on('connect', function() {

		socket.emit('query', {
			name: '',
			version: '*'
		});

		socket.on('queryresult', function(workers) {
			workers = workers.map(function(worker) {
				return {
					name: worker.browser.name,
					version: worker.browser.version
				}
			})
			emitter.emit('data', workers);
			socket.disconnect();
		});
	});

	socket.on('disconnect', function() {
		emitter.emit('end');
	});

	socket.on('error', function(err) {
		emitter.emit('error', err.message);
		emitter.emit('end');
	})

	return emitter;
}

Browserman.prototype.test = function(order, cb) {
	var emitter = new EventEmitter();

	var socket = io.connect(this.serverAddress);

	socket.on('connect', function() {

		socket.emit('query', order.requirement);

		var ongoings = 0;

		socket.on('queryresult', function(workers) {
			if (!workers || workers.length === 0) {
				return cb(new Error('no compatible browser'))
			}
			ongoings = workers.length;

			for (var i = workers.length - 1; i >= 0; i--) {
				var worker = workers[i];
				socket.emit('test', {
					url: order.url,
					requirement: {
						workerId: worker.workerId
					}
				});
			};
		})

		socket.on('done', function(result) {
			emitter.emit('data', {
				browser: result.browser,
				data: result.data
			})
			if (--ongoings == 0) {
				socket.disconnect();
			}
		})

	});

	socket.on('disconnect', function() {
		emitter.emit('end');
	});

	socket.on('error', function(err) {
		emitter.emit('error', err);
		emitter.emit('end');
	})

	return emitter;
}

Browserman.prototype.exit = function() {
	process.exit(0);
};

module.exports = Browserman;