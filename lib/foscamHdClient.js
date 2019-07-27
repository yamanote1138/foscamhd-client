'use strict';

const	request = require('request');
const	url = require('url');

function FoscamHdClient (config) {

	this.config = {
    protocol:'http',
    port:80
  };

  Object.assign(this.config, config);

  if(!this.config.protocol) throw new Error('protocol not specified');
  if(typeof(this.config.protocol) != 'string') throw new Error('protocol is not a string');
  if(!['http', 'https'].includes(this.config.protocol)) throw new Error('specified protocol is not supported');

  if(!this.config.host) throw new Error('host not specified');
  if(typeof(this.config.host) != 'string') throw new Error('host is not a string');

  if(!this.config.port) throw new Error('port not specified');
  if(typeof(this.config.port) != 'number') throw new Error('port is not a number');
  if(this.config.port < 0 || this.config.port > 65535) throw new Error('port is out of range');

  if(!this.config.user) throw new Error('user not specified');
  if(typeof(this.config.user) != 'string') throw new Error('user is not a string');

  if(!this.config.pass) throw new Error('pass not specified');
  if(typeof(this.config.pass) != 'string') throw new Error('pass is not a string');
}

FoscamHdClient.prototype={

	_sendCommand: function(cmd, data, done){

		if(!cmd) return done('no command given');

		let query = {
			usr: this.config.user,
			pwd: this.config.pass,
			cmd: cmd
		};

    Object.assign(query, data);

		// http://domain.com:88/cgi-bin/CGIProxy.fcgi&usr=admin&pwd=1234&cmd=commandname&option=value
		let uri = url.format({
			protocol: 'http',
			hostname: this.config.host,
			port: this.config.port,
			pathname: '/cgi-bin/CGIProxy.fcgi',
			query: query
		});

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
		}));
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
		let cmd = (state==='on') ? 'openInfraLed' : 'closeInfraLed';
		this._sendCommand(cmd, {}, done);
	}

};

module.exports = FoscamHdClient;
