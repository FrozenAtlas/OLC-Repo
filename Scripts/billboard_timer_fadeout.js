//---JS Code by Ben---
//---edited by dombeef ---
//---Takes a Billboard and disables it after a certain amount of time
// set it up as initialized and have fun tweaking it, ive got it set at Time: 2.00, Fade Time:3.00, and black delay at 0.00
// @input Component.SpriteVisual Billboard
// @input float time

//@input float fadeTime = 0.1

//@input float blackdelay = 0.5 {"widget": "slider", "min": 0, "max": 5, "step": 0.01}

needToFadeIn = false;
script.Billboard.enabled = true;
script.Billboard.getMaterial(0).getPass(0).baseColor = new vec4(1, 1, 1, 1);

var needToFadeOut = false;
var needToFadeIn = false;
var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(function(eventData)
{
    needToFadeIn = true;
    //script.Billboard.enabled = false;
});

delayedEvent.reset(script.time);


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);

function update() {
script.Billboard.enabled = true;
    if (needToFadeIn) {

        var color = script.Billboard.mainPass.baseColor;

        if (color.a <= 1.0) {

            color.a -= getDeltaTime() / script.fadeTime;

            color.a = Math.min(color.a, 1.0);

            script.Billboard.mainPass.baseColor = color;

        }
        if (color.a == 0) {
            needToFadeOut = true;
            needToFadeIn = false;
        }


    }
    if (needToFadeOut) {
        if (getTime() > global.timerstart + script.blackdelay) {
            var color = script.mySpriteVisual.mainPass.baseColor;


            color.a = 0.0;

            script.mySpriteVisual.mainPass.baseColor = color;

           needToFadeOut = false;

        }

    }


}
