var _ = require('lodash'),
	request = require('request');

function FoscamHdClient (config) {

	this.config = _extend(
		{
			host:'',
			port:80,
			user:'',
			pass:''
		},
		config
	);

}

FoscamHdClient.prototype={

	_sendCommand: function(cmd, data, done){

		if(!host) return done('no host given');
		if(!port) return done('no port given');
		if(!user) return done('no user given');
		if(!pass) return done('no password given');
		if(!cmd) return done('no command given');

		qs = _extend(
			{
				usr: this.config.user,
				pwd: this.config.pass,
				cmd: cmd
			},
			data
		);

		//http://192.168.1.2/cgi-bin/CGIProxy.fcgi&usr=admin&pwd=123&cmd=ABC
		var options = {
			host: this.config.host,
			port: this.config.port,
			path: '/cgi-bin/CGIProxy.fcgi',
			method: 'GET',
			qs: qs
		};

		request.get(options, done);
	},

	gotoPreset: function(name, done){
		_sendCommand('ptzGotoPresetPoint', {name:name}, done);
	}

};

exports = module.exports = FoscamHdClient;