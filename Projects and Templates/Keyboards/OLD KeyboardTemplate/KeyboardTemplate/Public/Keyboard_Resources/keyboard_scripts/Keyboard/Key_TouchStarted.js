// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input Asset.Material KeyPress
//@input Asset.Material TogglePress
//@input Component.SpriteVisual sprite


var currName = script.getSceneObject().getParent().getParent().name;

script.sprite.clearMaterials();

if(global.OnOff == currName){
	script.sprite.addMaterial(script.TogglePress);
}else{
	script.sprite.addMaterial(script.KeyPress);
}