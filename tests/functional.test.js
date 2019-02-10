'use strict';

//requires
const FoscamHdClient = require('../lib/foscamHdClient.js');
const	nconf = require('nconf'); // eslint-disable-line node/no-unpublished-require
const prompt = require('prompt'); // eslint-disable-line node/no-unpublished-require

//setup
let config = nconf.file('./tests/config.json').get('testcamera');
let client = new FoscamHdClient(config);

let displayOutput = function(err, data){
	if(err) throw err;
	console.log(data); // eslint-disable-line
};

prompt.start();

prompt.get([ {name:'function', description:'choose function to execute', 'default':'gotoPreset'} ] , function (err, result){
	switch(result.function){
		case 'gotoPreset':
			prompt.get([ {'name':'name', 'default':'center'} ], function (err, result){
				client.gotoPreset( result.name, displayOutput );
			});
			break;
		case 'getIrMode':
			client.getIrMode( displayOutput );
			break;
		case 'setIrMode':
			prompt.get([ {'name':'mode', 'default':'manual'} ], function (err, result){
				client.setIrMode( result.mode, displayOutput );
			});
			break;
		case 'setIrState':
			prompt.get([ {'name':'state', 'default':'on'} ], function (err, result){
				client.setIrState( result.state, displayOutput );
			});
			break;
		case 'getStreamUrl':
			client.getStreamUrl( displayOutput );
			break;
		default:
			throw 'unsupported function';
	}
});
