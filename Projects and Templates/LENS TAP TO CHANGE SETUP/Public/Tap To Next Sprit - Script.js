// -----JS CODE-----
//@input Component.SpriteVisual visual
//@input Asset.Texture[] postEffects
var count = 0;
function onTapped(eventData)
{
  script.visual.mainPass.baseTex = script.postEffects[count]

    if(count < script.postEffects.length - 1){
        count++
    } else 
    {
        count = 0
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);