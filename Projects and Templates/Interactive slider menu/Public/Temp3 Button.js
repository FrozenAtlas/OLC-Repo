var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
print("temp3 pressed");
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
print("temp3 lifted");
});