var logger = require('./lib/logger');

var Browserman = require('./lib/browserman');

var browserman = new Browserman();

browserman.list(function(err, workers) {
    if (err) {
        return logger.error(err.message);
    }

    for (var i = workers.length - 1; i >= 0; i--) {
        logger.info(workers[i]);
    };

    browserman.exit();
});
