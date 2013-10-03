var FoscamHdClient = require('../lib/foscamhd.js'),
	prompt = require('prompt');

prompt.start();

var prompt_options = [
	{
		'name':'host',
		'default':'192.168.1.2'
	},
	{
		'name':'port',
		'default':'88'
	},
	{
		'name':'user',
		'default':'admin'
	},
	'pass',
	{
		'name':'preset',
		'default':'center'
	}
];

prompt.get(prompt_options, function (err, result) {
	var cam = new FoscamHdClient({host:result.host, port:result.port, user:result.user, pass:result.pass});

	cam.gotoPreset( result.preset, function(err, data){
		if(err) return console.log(err);
		console.log(data);
	});
});

