// -----Tap a certain amount of time to trigger an animation-----
// Made by HyperFX

// @input int tapamount {"label":"Tap", "hint":"Amount of Taps to trigger animation"}
// @input Component.SpriteVisual anim 

var tap = 0;
function onTapped(eventData)
{
    tap++;
    print("Tap "+ tap);
    if(tap == script.tapamount) {
        script.anim.getMaterial(0).getPass(0).baseColor = new vec4(1, 1, 1, 1);
        script.anim.mainPass.baseTex.control.play(1,0); 
        tap = 0;
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);

 
 