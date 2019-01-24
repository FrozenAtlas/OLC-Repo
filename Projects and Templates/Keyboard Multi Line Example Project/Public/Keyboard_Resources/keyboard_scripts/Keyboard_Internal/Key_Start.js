// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


var currName = script.getSceneObject().getParent().getParent().name;


if (global.KeyboardIDSpace == currName){

	var size = script.getSceneObject().getFirstComponent('Component.SpriteAligner').size;
	var width = global.KeyboardSpaceWidth;
	script.getSceneObject().getFirstComponent('Component.SpriteAligner').size = new vec2(width, size.y);

}