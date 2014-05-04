var fs = require('fs');
var path=require('path');

function initIfNeeded() {
	var home = getBrowsermanHome();
	if (!fs.existsSync(home)) {
		fs.mkdirSync(home);
		fs.writeFileSync(path.join(home,'config.json'), JSON.stringify({
			host: 'browserman.dp',
			port: 9000
		}));
	}
}

function getBrowsermanHome() {
	var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
	return path.join(home,'.browserman');
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
	var configPath=path.join(getBrowsermanHome(),'config.json');
	if (fs.existsSync(configPath)) {
		return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	} else {
		return {};
	}
}

function save(config) {
	initIfNeeded();
	fs.writeFileSync(path.join(getBrowsermanHome(),'config.json'), JSON.stringify(config));
}

module.exports = {
	set: set,
	get: get,
	load: load,
	save: save,
	home: getBrowsermanHome
};