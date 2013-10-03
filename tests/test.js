var FoscamHdClient = require('../lib/foscamhd.js'),
	prompt = require('prompt');

prompt.start();

var prompt_options = [
	{
		'name':'host',
		// 'default':'192.168.1.2'
		'default':'pointblank.x.chadfrancis.com'
	},
	{
		'name':'port',
		// 'default':'88'
		'default':'8111'
	},
	{
		'name':'user',
		'default':'admin'
	},
	'pass'
];

prompt.get(prompt_options, function (err, result) {
	var cam = new FoscamHdClient({host:result.host, port:result.port, user:result.user, pass:result.pass}),
		displayOutput = function(err, data){
			if(err) throw err;
			console.log(data);
		};

	prompt.get([ {'name':'function', 'default':'gotoPreset'} ] , function (err, result){
		switch(result.function){
			case 'gotoPreset':
				prompt.get([ {'name':'name', 'default':'center'} ], function (err, result){
					cam.gotoPreset( result.name, displayOutput );
				});
				break;
			case 'setInfrared':
				prompt.get([ {'name':'state', 'default':'0'} ], function (err, result){
					cam.setInfrared( result.state, displayOutput );
				});
				break;
			default:
				throw 'unsupported function';
		}
	});

});

