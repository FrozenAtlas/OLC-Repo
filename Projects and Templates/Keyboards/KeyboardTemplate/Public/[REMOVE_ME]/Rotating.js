// simply rotates the object

var speed = .5;
var transform = script.getTransform();
var rotation = transform.getLocalRotation();
var rotateBy = quat.angleAxis(Math.PI*getDeltaTime()*speed, vec3.back());
rotation = rotation.multiply(rotateBy);
transform.setLocalRotation(rotation);