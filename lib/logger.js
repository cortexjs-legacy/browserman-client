var winston = require('winston');

var config = {
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
		pass: 4,
		fail: 5,
	},
	colors: {
		debug: 'blue',
		info: 'blue',
		warn: 'yellow',
		error: 'red',
		pass: 'green',
		fail: 'red'
	}
};

winston.addColors(config.colors);

var logger = new(winston.Logger)({
	levels: config.levels,
	transports: [
		new(winston.transports.Console)({
			level: 'debug',
			timestamp: false,
			colorize: true,
		})
	]
});

module.exports = logger;