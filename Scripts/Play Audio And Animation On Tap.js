// No idea if this one works pretty messed up when trying to copy it
// Properties: 
// @input Component.AudioComponent audio 
// @input Component.SpriteVisual anim  
var tapEvent = script.createEvent("TapEvent"); 
tapEvent.bind(function() {      
    script.anim.getMaterial(0).getPass(0).baseColor = new vec4(1, 1, 1, 1);      
    var anim = script.getSceneObject().getFirstComponent("Component.SpriteVisual");     
    anim.mainPass.baseTex.control.play(1,0);            
    script.audio.play(1); }); 