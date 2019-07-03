// @input float delayTime = 2

var playingParticles = false;


var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(function(eventData)
{
   global.controlTime = getTime();
 playingParticles = true;
});

// Start with a 2 second delay
delayedEvent.reset(script.delayTime);

function onUpdate (time)
{
 if (playingParticles) {

global.animTime = global.controlTime - getTime();
 var positiveTime = -animTime * 0.5;

script
 .getSceneObject()
 .getFirstComponent("Component.MeshVisual")
 .getMaterial(0)
 .mainPass
 .externalTimeInput = positiveTime; 
 }
}
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);