// -----JS CODE-----
// @input SceneObject target
// @input vec3 offset
// @input float smoothSpeed = 0.05

var transform = script.getTransform();

if(script.target)
{
    var targetTransform = script.target.getTransform();
}
else
{
    print("SmoothFollow.js: Please assign the target");
}


function onUpdateEvent(eventData)
{
    if(script.target)
    {
        var desiredPosition = targetTransform.getWorldPosition().add(script.offset);
        var smoothedPosition = vec3.lerp(transform.getWorldPosition(),desiredPosition, script.smoothSpeed)
        transform.setWorldPosition(smoothedPosition);
    }
}
var event = script.createEvent("UpdateEvent");
event.bind(onUpdateEvent);  