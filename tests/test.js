//requires
var FoscamHdClient = require('../lib/foscamhd.js'),
	nconf = require('nconf'),
	prompt = require('prompt');

//setup
var config = nconf.file('./tests/config.json').get('testcamera'),
	client = new FoscamHdClient(config);

var displayOutput = function(err, data){
	if(err) throw err;
	console.log(data);
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
