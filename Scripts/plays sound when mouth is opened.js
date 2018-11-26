//---JS CODE BY BEN---

//This inputs an audio component in the script to use. 
// @input Component.AudioComponent Sound

//Mouth Opened Event
var event = script.createEvent("MouthOpenedEvent");
event.faceIndex = 0;
event.bind(function (eventData)
{
    //Plays sound when mouth is opened
    script.Sound.play(1);
});

//Mouth Closed Event
var event = script.createEvent("MouthClosedEvent");
event.faceIndex = 0;
event.bind(function (eventData)
{
    //Stops sound when mouth is closed
    script.Sound.stop(true);
});