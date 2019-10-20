// @input SceneObject objA
// @input SceneObject objB
// @input Component.AnimationMixer anim
// @input int speed = 60;

// Use the Behavior script to use distance check and set the custom response to the two names below, or rename for your own!
global.behaviorSystem.addCustomTriggerResponse("startWalking", startWalking)
global.behaviorSystem.addCustomTriggerResponse("stopWalking", stopWalking)

var objA = script.objA.getTransform();
var objB = script.objB.getTransform();
var aPos;
var bPos;
var toCamZ;
var toCamX;
var toObjDistance;
var walking;

// Called when the 'startWalking' custom response is sent
function startWalking()
{
   walking = true;
   script.anim.stop("idle");
   script.anim.start("walk", 0, -1);
}

// Called when the 'stopWalking' custom response is sent
function stopWalking()
{
   walking = false;
   script.anim.stop("walk");
   script.anim.start("idle", 0, -1);
}

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
    if (walking)
    {
        // Get Position and X/Z distances
        aPos = objA.getWorldPosition();
        bPos = objB.getWorldPosition(); 
        toCamZ = aPos.z - bPos.z;
        toCamX = aPos.x - bPos.x;
        // Using Pythagorean Theorem to get total distance
        toObjDistance = Math.sqrt(Math.pow(toCamZ, 2) + Math.pow(toCamX, 2));
        // Normalize the X and Z distances
        toCamZ = toCamZ/toObjDistance;
        toCamX = toCamX/toObjDistance;
        // Imcrement the X and Z positions using deltatime for independent frame rate
        aPos.z -= toCamZ * eventData.getDeltaTime() * script.speed;
        aPos.x -= toCamX * eventData.getDeltaTime() * script.speed;
        objA.setWorldPosition(aPos);
    }
});