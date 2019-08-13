// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input Component.ScreenTransform transform



// previous value
var prevValue = -100;
var deltaValue = 0;

// do not animate back if currently touching
var touching = false;




// touch/move event
var event = script.createEvent("TouchMoveEvent");
event.bind(function(eventData)
{

	touching = true;

	// get touch info
	var p = eventData.getTouchPosition();

	// get delta
	if(prevValue == -100){
		prevValue = p.x;
	}

	deltaValue = p.x - prevValue;
	prevValue = p.x;

	// set new pos
	var c = 4;
	script.transform.anchors.right += deltaValue * c;
	script.transform.anchors.left += deltaValue * c;

});




// touch release
var event = script.createEvent("TouchEndEvent");
event.bind(function(eventData)
{

	// reset delta and prev
	prevValue = -100;
	deltaValue = 0;

	touching = false;

});




// touch release
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData)
{

	if(!touching){

		var r = script.transform.anchors.right;

		if(Math.abs(r - 1) > .01){

			// animate back to start (-1 left, 1 right)
			var c = 6;
			var anim = -(script.transform.anchors.right - 1) * getDeltaTime() * c;

			// set new pos
			script.transform.anchors.right += anim;
			script.transform.anchors.left += anim;

		}else{

			if (r != 1){

				// set to center
				script.transform.anchors.right = 1;
				script.transform.anchors.left = -1;

			}

		}

	}

});