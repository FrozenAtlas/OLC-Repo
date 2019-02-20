var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
print("temp1 pressed");
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
print("temp1 lifted");
});