node-foscamhd
=============

simple node client for Foscam HD cameras providing a few basic operations

## Usage

setup and configure
```javascript
var FoscamHdClient = require('foscamhd-client');

var client = new FoscamHdClient({
	host: 'http://domain.com',
	port: 1138,
	user: 'admin',
	pass: 'sup3rs3cr3t'
});
```

get url of mjpeg stream
todo: add optional guest and operator user/pass sections to config, pass in role as param
```javascript
client.getStreamUrl(function(err, url){
	// handle error and/or do stuff
	// url should be something like: http://domain.com:1138/cgi-bin/CGIStream.cgi?cmd=GetMJStream&usr=admin&pwd=sup3rs3cr3t
});
```

moves camera to preset location 'name'
todo: add method to surface list of preset names
```javascript
client.gotoPreset(name, function(err, resp){
	// handle error and/or do stuff
});
```

get current infrared mode ('auto' or 'manual')
```javascript
client.getIrMode(function(err, mode){
	// handle error and/or do stuff
});
```

set infrared mode ('auto' or 'manual')
```javascript
client.setIrMode(mode, function(err, resp){
	// handle error and/or do stuff
});
```

set infrared led state ('on' or 'off')
note: IrMode must be set to 'manual' or setting the state will have no effect
```javascript
client.setIrState(state, function(err, resp){
	// handle error and/or do stuff
});
```

## Testing

create a file in the ./tests/ directory called config.json as below (obviously, substitute your values)
```javascript
{
	"testcamera": {
		"host":"http://domain.com",
		"port":"1138",
		"user":"admin",
		"pass":"sup3rs3cr3t",
	}
}
```

run the following
```bash
npm test
```
