// -----JS CODE-----
global.Left = false;

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    global.Left = true;
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
    global.Left = false;
});