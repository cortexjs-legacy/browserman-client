var Browserman = require('../lib/browserman');
var logger = require('../lib/logger');

module.exports.execute = function(options) {
    browserman = new Browserman();
    browserman.test(options,
        function(result) {
            for (var i = result.length - 1; i >= 0; i--) {
                logger.success('test done: %s', JSON.stringify(result[i]));
            }
            browserman.exit();
        }
    )
}