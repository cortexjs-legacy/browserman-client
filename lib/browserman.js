var io = require('socket.io-client');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var logger = require('./logger');
var fs=require('fs');

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

		socket.emit('list');

		socket.on('list:result', function(workers) {
			workers = workers.map(function(worker) {
				return worker.browser;
			})
			emitter.emit('done', workers);
			socket.disconnect();
		});
	});

	socket.on('disconnect', function() {
		emitter.emit('complete');
	});

	socket.on('error', function(err) {
		emitter.emit('error', new Error('connection error'));
		emitter.emit('complete');
	})

	return emitter;
}

Browserman.prototype.test = function(order, cb) {
	var emitter = new EventEmitter();

	var socket = io.connect(this.serverAddress);

	socket.on('connect', function() {

		socket.emit('test', generateTestOptions(order));

		socket.on('done', function(result) {
			emitter.emit('done', result);
		})

		socket.on('complete', function(result) {
			emitter.emit('complete', result);
			socket.disconnect();
		})

	});

	socket.on('disconnect', function() {
		emitter.emit('complete');
	});

	socket.on('error', function(err) {
		emitter.emit('error', new Error('connection error'));
		emitter.emit('complete');
	})

	return emitter;
}

function generateTestOptions(order){
	var options={
		requirement:order.requirement,
		verbose:order.verbose,
	}
	if(order.html){
		options.html=fs.readFileSync(order.html).toString();
	}
	else if(order.script){
		//todo;
	}
	else if(order.url){
		options.url=order.url;
	}
	
	return options;
}

module.exports = Browserman;