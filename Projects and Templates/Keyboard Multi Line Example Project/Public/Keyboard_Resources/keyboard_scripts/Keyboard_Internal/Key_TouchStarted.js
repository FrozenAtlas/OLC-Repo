// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input Asset.Material KeyPress
//@input Component.SpriteVisual sprite


var done = false;

var currName = script.getSceneObject().getParent().getParent().name;
var oV = script.sprite.getMaterial(0).getPass(0).baseColor;


if(global.KeyboardIDOnOff == currName){
	script.sprite.getMaterial(0).getPass(0).baseColor = new vec4(oV.x, oV.y, oV.z, .3);

	done = true;
}

if(global.KeyboardIDLineDown == script.getSceneObject().getParent().name && global.KeyboardCurrentLine == 1){
	done = true;
}

if(global.KeyboardIDLineUp == script.getSceneObject().getParent().name && global.KeyboardCurrentLine == global.KeyboardMaxLines){
	done = true;
}


if(!done){
	script.sprite.clearMaterials();
	script.sprite.addMaterial(script.KeyPress);

	done = true;
}