// -----JS CODE-----
//This script enables/disables elements based on which side of the camera is active.
//Simply add it as an object, set it to initialized and add your own components and you're set.
//@input Component.YouWant toHide

if(global.scene.getCameraType() == "front")
{
    script.toHide.enabled = true;		//script.toHide will be active on the front camera side
}
else if(global.scene.getCameraType() == "back")
{
    //(false) You define what goes on the back side here
}


var event = script.createEvent("CameraFrontEvent");
event.bind(function (eventData)
{
    //see above for "front"
});

var event = script.createEvent("CameraBackEvent");
event.bind(function (eventData)
{
    //see above for "back"
});
