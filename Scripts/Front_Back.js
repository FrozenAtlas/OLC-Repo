// -----JS CODE-----
//@input Component.YouWant toHide

if(global.scene.getCameraType() == "front")
{
    script.toHide.enabled = true;		//if you want it on front, set true, else false
}
else if(global.scene.getCameraType() == "back")
{
    //false
}

var event = script.createEvent("CameraFrontEvent");
event.bind(function (eventData)
{
    //true
});

var event = script.createEvent("CameraBackEvent");
event.bind(function (eventData)
{
    //false
});
