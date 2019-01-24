// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input Component.SpriteVisual FadingSprite 


var originalValue = script.FadingSprite.getMaterial(0).getPass(0).baseColor;
var oV = script.FadingSprite.getMaterial(0).getPass(0).baseColor;
var done = 0;

function FadeInOut (eventData)
{

	if(!global.KeyboardStopAttention){

		var newValue = Math.sin(global.getTime() * 5);
		script.FadingSprite.getMaterial(0).getPass(0).baseColor = new vec4(oV.x, oV.y, oV.z, newValue /3 + .66);

	}else{

		if(done == 0){

			//script.FadingSprite.getMaterial(0).getPass(0).baseColor = originalValue;
			done = 1;

		}

	}

}

var event = script.createEvent("UpdateEvent");
event.bind(FadeInOut);