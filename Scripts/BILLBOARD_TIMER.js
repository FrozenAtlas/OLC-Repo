//---JS Code by Ben---
//---Takes a Billboard and disables it after a certain amount of time
// @input Component.SpriteVisual Billboard
// @input float time

script.Billboard.enabled = true;

var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(function(eventData)
{
    script.Billboard.enabled = false;
});

delayedEvent.reset(script.time);