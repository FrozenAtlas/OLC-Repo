var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
print("Contrast button pressed");
});

var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{
print("Contrast button lifted");
});