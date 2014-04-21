var fs = require("fs");

function initIfNeeded() {
	var path = getBrowsermanHome();
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
		fs.writeFileSync(path + '/config.json', JSON.stringify({
			host: '127.0.0.1',
			port: 9000
		}));
	}
}

function getBrowsermanHome() {
	var path = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
	return path + '/.browserman';
}

function set(key, value) {
	var config = load();
	config[key] = value;
	save(config);
}

function get(key) {
	return load()[key];
}

function load() {
	initIfNeeded();
	var path = getBrowsermanHome() + '/config.json';
	if (fs.existsSync(path)) {
		return JSON.parse(fs.readFileSync(path, 'utf-8'));
	} else {
		return {};
	}
}

function save(config) {
	initIfNeeded();
	fs.writeFileSync(getBrowsermanHome() + '/config.json', JSON.stringify(config));
}

module.exports = {
	set: set,
	get: get,
	load: load,
	save: save
};