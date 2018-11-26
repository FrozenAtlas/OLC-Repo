//Example for scaling
// @input int scaleup
var v = script.scaleup;
var transform = script.getSceneObject().getTransform();
var scale = transform.getLocalScale();
scale.y += v;
scale.x += v;
scale.z += v;
script.getSceneObject().getTransform().setLocalScale(scale); 