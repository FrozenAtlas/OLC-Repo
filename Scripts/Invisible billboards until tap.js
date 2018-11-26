//-----JS CODE----
//--Made By Ben--
// @input Component.SpriteVisual[] Billboard

for (var i = 0; i <= script.Billboard.length; i++)
{
    script.Billboard[i].mainPass.baseColor = new vec4(0,0,0,0);
}

function onTapped(eventData)
{
    for (var i = 0; i <= script.Billboard.length; i++) {
    script.Billboard[i].mainPass.baseColor = new vec4(1,1,1,1);
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);