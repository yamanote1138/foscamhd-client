node-foscamhd
=============

Simple interface to Foscam HD IP cameras, provides basic operations (movement, infrared, etc.)


Here's what is supported thus far:

gotoPreset(name): moves camera to preset location 'name' 

getIrMode: get current infrared mode (auto or manual)

setIrMode(mode): set current infrared mode (auto or manual)

setIrState(state): turn infrared led on or off, requires infrared mode be set to 'manual'

getStreamingUrl: get camera's mjpeg stream url
