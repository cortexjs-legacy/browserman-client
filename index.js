var logger = require('./lib/logger');

var Browserman = require('./lib/browserman');

var browserman = new Browserman();

// browserman.list(function(err, workers) {
//     if (err) {
//         return logger.error(err.message);
//     }

//     for (var i = workers.length - 1; i >= 0; i--) {
//         logger.info(workers[i]);
//     };

//     browserman.exit();
// });


browserman.test({
        url: 'http://localhost:9000/public/test.html',
        requirement: {
            name: 'ALL',
            version: '>0.0.0'
        }
    },
    function(result) {
        for (var i = result.length - 1; i >= 0; i--) {
            logger.info('test done: %s', JSON.stringify(result[i]));
        }
        browserman.exit();
    }
)