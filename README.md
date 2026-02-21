> [!WARNING]
> **DEPRECATED — No longer maintained.**
> This package is no longer actively developed or supported. No further updates, bug fixes, or security patches will be issued. It is kept available for reference and for anyone who may find the source code useful. Use at your own risk.

node-foscamhd
=============

simple node client for Foscam HD cameras providing a few basic operations

[![NPM](https://nodei.co/npm/foscamhd-client.png?compact=true)](https://nodei.co/npm/foscamhd-client/)

## Usage

setup and configure
```javascript
const FoscamHdClient = require('foscamhd-client');

let client = new FoscamHdClient({
  protocol: 'http', // if not specified, defaults to 'http'
	host: '192.168.1.123',
	port: 1138, // if not specified, defaults to 80
	user: 'admin',
	pass: 'p4$$w4rd'
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

## Functional Testing

create a file in the ./tests/ directory called config.json as below (obviously, substitute your values)
```javascript
{
	"testcamera": {
		"host":"192.168.1.123",
		"port":1138,
		"user":"admin",
		"pass":"p4$$w4rd"
	}
}
```

run the following
```bash
npm test
```
