// @input Component.AudioComponent audio

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function()
{  
   script.audio.play(1);
});