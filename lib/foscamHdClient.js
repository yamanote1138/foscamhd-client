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

		query = _.extend(
			{
				usr: this.config.user,
				pwd: this.config.pass,
				cmd: cmd
			},
			data
		);

		// http://domain.com:88/cgi-bin/CGIProxy.fcgi&usr=admin&pwd=1234&cmd=commandname&option=value
		var uri = url.format({
				protocol: 'http',
				hostname: this.config.host,
				port: this.config.port,
				pathname: '/cgi-bin/CGIProxy.fcgi',
				query: query
			});
		console.log(uri);

		request.get(uri, function(err, resp, body){
			done(err, body);
		});

	},

	getStreamUrl: function(done){
		// http://domain.com:88/cgi-bin/CGIStream.cgi?cmd=GetMJStream&usr=guest&pwd=password
		return done(null, url.format({
				protocol: 'http',
				hostname: this.config.host,
				port: this.config.port,
				pathname: 'cgi-bin/CGIStream.cgi',
				query: {
					cmd: 'GetMJStream',
					usr: this.config.user,
					pwd: this.config.pass
				}
			}
		));
	},

	gotoPreset: function(name, done){
		this._sendCommand('ptzGotoPresetPoint', {name:name}, done);
	},

	getIrMode: function(done){
		this._sendCommand('getInfraLedConfig', {}, done);
	},

	setIrMode: function(mode, done){
		this._sendCommand('setInfraLedConfig', {mode: (mode==='manual') ? 1:0}, done);
	},

	setIrState: function(state, done){
		var cmd = (state==='on') ? 'openInfraLed' : 'closeInfraLed';
		this._sendCommand(cmd, {}, done);
	}

};

exports = module.exports = FoscamHdClient;