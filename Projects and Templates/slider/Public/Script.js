// -----JS CODE-----
// @input SceneObject spriteRight
// @input SceneObject spriteLeft
// @input SceneObject cursor
// @input float cursorPosition {"widget":"slider", "label":"Cursor position", "min":-1.0, "max":1.0, "step":0.1}

global.touchSystem.touchBlocking = true;

var spriteRightAlign = script.spriteRight.getComponentByIndex("Component.SpriteAligner", 0);
var spriteLeftAlign = script.spriteLeft.getComponentByIndex("Component.SpriteAligner", 0);
var cursorAligner = script.cursor.getComponentByIndex("Component.SpriteAligner", 0);

// init cursor position
cursorAligner.bindingPoint = new vec2(0, script.cursorPosition);


mapN = function (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var eventStart = script.createEvent("TouchMoveEvent");
eventStart.bind(function(eventData)
{
	var pos = eventData.getTouchPosition();

    var x = mapN(pos.x ,0, 1, -0.5, 0.5);
    var xCursor = mapN(pos.x ,0, 1, -1, 1);

    cursorAligner.bindingPoint = new vec2(xCursor, script.cursorPosition);

    spriteRightAlign.bindingPoint = new vec2(0.5 + x, 0);
    spriteLeftAlign.bindingPoint = new vec2(-0.5 + x, 0);

    spriteRightAlign.size = new vec2(0.5 - x, 1);
	spriteLeftAlign.size = new vec2(0.5 + x, 1);
});