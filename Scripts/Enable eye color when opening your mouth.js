// Made by Ben (Electricsynapse#2395)
//@input SceneObject Eye
var event = script.createEvent("MouthOpenedEvent");
event.faceIndex = 0;
event.bind(function (eventData)
{
    script.Eye.enabled = true;
});
var event = script.createEvent("MouthClosedEvent");
event.faceIndex = 0;
event.bind(function (eventData)
{
    script.Eye.enabled = false;
}); 


print('water for flavor')