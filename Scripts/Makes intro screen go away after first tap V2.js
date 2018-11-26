//you can also use this and just attach it to the Intro Sprite -Ben
//---JS CODE---
//---Made By Ben---
// Makes intro screen go away after first tap
var Intro = script.getSceneObject();
var count = 0;

Intro.enabled = true;

function onTapped(eventData)
{
    if (count > 0)
    {
        Intro.enabled = false;
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);