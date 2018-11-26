//You should add a cube, add this script to it (Initialized) and give it a manupilation component, touch component and an invisible material (Matte Shadow,Blend Mode: Multiply).

//Makes the cube stick to the camera.
// @input Component.ManipulateComponent manipulateComponent
script.manipulateComponent.minDistance = -Infinity
var Yaxis = script.createEvent("TouchMoveEvent");
Yaxis.bind(function(eventData)
{
var transform = script.getSceneObject().getTransform();
var pos = transform.getLocalPosition();
if(pos.z !=0)
{
// For slower movement change the line below to ""pos.y -= 0.3 * pos.z;""
    pos.y -= pos.z;
    pos.z = 0; 
}
script.getSceneObject().getTransform().setLocalPosition(pos);
});    
//If the 2D image is glitching make the cube bigger and then rescale the image to your preference.
//Moudiz de gooB