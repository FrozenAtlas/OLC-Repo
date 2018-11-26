//---JS CODE---
//---Made By Ben---
// Makes intro screen go away after first tap
// @input Component.SpriteVisual Intro
var count = 0;

script.Intro.enabled = true;

function onTapped(eventData)
{
    if (count > 0)
    {
        script.Intro.enabled = false;
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);