// -----JS CODE-----
global.Down = false;

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    global.Down = true;
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
    global.Down = false;
});