var _ = require('lodash'),
	request = require('request'),
	url = require('url');

function FoscamHdClient (config) {

	this.config = _.extend(
		{
			host:'',
			port:80,
			user:'',
			pass:''
		},
		config
	);

	if(!this.config.host) throw 'no host given';
	if(!this.config.port) throw 'no port given';
	if(!this.config.user) throw 'no user given';
	if(!this.config.pass) throw 'no password given';

}

FoscamHdClient.prototype={

	_sendCommand: function(cmd, data, done){

		if(!cmd) return done('no command given');

		qs = _.extend(
			{
				usr: this.config.user,
				pwd: this.config.pass,
				cmd: cmd
			},
			data
		);

		var uri = url.format({
				protocol: 'http',
				hostname: this.config.host,
				port: this.config.port,
				pathname: '/cgi-bin/CGIProxy.fcgi'
			});

		//http://192.168.1.2/cgi-bin/CGIProxy.fcgi&usr=admin&pwd=123&cmd=ABC
		var options = {
			uri:uri,
			method: 'GET',
			qs: qs
		};

		request.get(options, done);

	},

	gotoPreset: function(name, done){
		this._sendCommand('ptzGotoPresetPoint', {name:name}, done);
	}

};

exports = module.exports = FoscamHdClient;