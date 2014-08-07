var io = require('socket.io-client');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var logger = require('./logger');

function Browserman(options) {
  var options = options || {};
  this.host = options.host || 'browserman.dp';
  this.port = options.port || 9000;
  this.serverAddress = 'http://' + this.host + ':' + this.port + '/client';
}

Browserman.prototype.list = function() {

  var emitter = new EventEmitter();

  var socket = io.connect(this.serverAddress, {
    'reconnect': true,
    'force new connection': true
  });

  socket.on('connect', function() {

    socket.emit('list');

    socket.on('list:result', function(workers) {
      workers = workers.map(function(worker) {
        return worker.browser;
      })
      emitter.emit('done', workers);
      emitter.emit('complete');
    });
  });

  socket.on('disconnect', function() {
    // emitter.emit('complete');
  });

  socket.on('error', function(err) {
    emitter.emit('error', new Error('connection error'));
    emitter.emit('complete');
  })

  return emitter;
}

Browserman.prototype.test = function(order, cb) {
  var emitter = new EventEmitter();

  var socket = io.connect(this.serverAddress, {
    'reconnect': true,
    'force new connection': true
  });

  socket.on('connect', function() {

    generateTestOptions(order, function(err, options) {
      if (err) {
        emitter.emit('error', err);
        emitter.emit('complete');
        return;
      }
      socket.emit('test', options);
    });

    socket.on('done', function(result) {
      emitter.emit('done', result);
    })

    socket.on('complete', function(result) {
      emitter.emit('complete', result);
      socket.disconnect();
    })

  });

  socket.on('disconnect', function() {
    // emitter.emit('complete');
  });

  socket.on('error', function(err) {
    emitter.emit('error', new Error('connection error'));
    emitter.emit('complete');
  })

  return emitter;
}

function generateTestOptions(order, cb) {
  var options = {
    appName: order.appName,
    requirement: order.requirement,
    verbose: order.verbose,
    timeout: order.timeout || 30000
  }
  if (order.path) {
    fs.readFile(order.path, function(err, html) {
      if (err) return cb(err);
      options.html = html;
      return cb(null, options);
    });
  } else if (order.url) {
    options.url = order.url;
    process.nextTick(function() {
      return cb(null, options);
    });
  }
}
module.exports = Browserman;