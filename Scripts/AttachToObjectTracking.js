// -----JS CODE-----
// AttachToObjectTracking.js
// Version: 0.0.1
// Event: Initialized
// Description: Attach a 3D object to an Object Tracking object with a tunable depth

// @input Component.Camera perspectiveCamera
// @input Component.ObjectTracking objectTracking
// @input SceneObject objectToAttach
// @input float baseDepthFactor = 250
// @input bool applyRotation = true

var screenTransform = script.objectTracking.getSceneObject().getFirstComponent("ScreenTransform");

// Convert anchor space [-1 to 1] to screen space [0 to 1]
function anchorSpaceToScreenSpace(point) {
    return new vec2( 
        (point.x * 0.5) + 0.5,
        (-point.y * 0.5) + 0.5 // note that Y is flipped in screen space
    );
}

function onUpdate() {
    if (script.objectTracking.isTracking()) {
        // Enable the object when tracking
        script.objectToAttach.enabled = true;

        var anchors = screenTransform.anchors;

        var center = anchors.getCenter();
        var size = anchors.getSize();
        var rotation = screenTransform.rotation;

        // Get the tracked object's position in camera screen space
        var screenPos = anchorSpaceToScreenSpace(center);

        // Estimate the depth by squaring the size of the tracked object
        var lenSquared = size.length + 1;
        lenSquared = lenSquared * lenSquared;
        lenSquared -= 1;

        var depth = script.baseDepthFactor / lenSquared;

        // Get the world position in the camera's view using our screen pos and estimated depth
        var worldPos = script.perspectiveCamera.screenSpaceToWorldSpace(screenPos, depth);

        // Apply world position
        script.objectToAttach.getTransform().setWorldPosition(worldPos);

        if (script.applyRotation) {
            // Apply rotation (should only be rotated on z axis)
            script.objectToAttach.getTransform().setWorldRotation(rotation);
        }
    } else {
        // Disable the object if not tracking
        script.objectToAttach.enabled = false;
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);
