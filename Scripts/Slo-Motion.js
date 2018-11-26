//FOLLOW THIS FREEZEFRAME TUTORIAL FIRST AND REPLACE THE FREEZEFRAME SCRIPT WITH THIS ONE
//https://www.youtube.com/watch?v=vhCEFbIkud0

//@input Component.Camera cam
//@input Asset.Texture deviceCamaeraTexture
//@input Component.SpriteVisual spriteVis

var update = script.createEvent("UpdateEvent");
var count = 0;

freezeFrame();
script.spriteVis.mainPass.cullMode = 1;

update.bind(function(eventData)
{
    count += 1
    if (count > 2){
        count=0;
        freezeFrame();
    };
});

function freezeFrame(eventData)
{
    var texCopy = script.deviceCamaeraTexture.copyFrame();
    script.spriteVis.mainPass.baseTex = texCopy;
}