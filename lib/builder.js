var jsdom = require('jsdom')
var path = require('path');
var fs = require('fs');

module.exports.processHTML = function(filePath, cb) {
	jsdom.env({
		file: filePath,
		features: {
			FetchExternalResources: false,
			ProcessExternalResources: false
		},
		done: function(errors, window) {
			if (errors) {
				return cb(new Error('error in parsing file: ' + filePath));
			}
			var document = window.document;
			var scripts = document.querySelectorAll('script');
			if (!scripts || scripts.length === 0) {
				return cb(null, window.document.innerHTML);
			}

			Array.prototype.forEach.call(scripts, function(script) {
				if (!script.src) {
					return;
				}
				if (script.src.charAt(0) != '.') {
					return;
				}
				var scriptPath = path.join(filePath, '../', script.src);
				script.text = fs.readFileSync(scriptPath).toString();
				script.src = '';
			});
			return cb(null, window.document.innerHTML);
		}

	});
}