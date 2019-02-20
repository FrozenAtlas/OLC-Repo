var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
print("temp2 pressed");
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
print("temp2 lifted");
});