// Made by apoc
//@input Component.MeshVisual mesh
var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    if(script.mesh.enabled){
script.mesh.enabled = false
}else{
script.mesh.enabled = true
}
});