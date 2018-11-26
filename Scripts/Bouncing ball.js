// @input Component.Camera camera

var by = 0;
var bx = 0;
var bz = 0;
var start = false;
 
function onTap () {
    start = true;
    by += 3;
    if (by > 10) {
        by = 10;
    }
    bx = (Math.random()-0.5);
    bz = (Math.random()-0.5);
}

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(onTap);
 
function update () {
    if (start) {
        var transform = script.getTransform ();
        var pos = transform.getWorldPosition ();
        var rot = transform.getLocalRotation ();
        var rotateBy = quat.angleAxis (bx*getDeltaTime (), vec3.up ());
        var rotateBy = quat.angleAxis (bz*getDeltaTime (), vec3.left ());
        rot = rot.multiply (rotateBy);
        transform.setLocalRotation (rot);

        pos.y += by;
        pos.x += bx;
        pos.z += bz;

        if (by > -4) {
            by -= 0.1;
        }

        if (pos.y < -245) {
            by = 0;
            pos.y = -52.3657;
            start = false;
        }
        
        if (Math.abs (script.camera.worldSpaceToScreenSpace (pos).x) >= 1 ) {
            bx *= -1;
            bz *= -1;
        }
        
        transform.setWorldPosition(pos);
    }
}
var frameUpdated = script.createEvent("UpdateEvent");
frameUpdated.bind(update); 

if (start = false) {
    
}