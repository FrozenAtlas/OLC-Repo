// -----JS CODE-----
global.Right = false;

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    global.Right = true;
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
    global.Right = false;
});