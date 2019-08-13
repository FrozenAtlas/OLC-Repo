// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input SceneObject label
//@input Asset.Material KeyIdle
//@input Asset.Material KeyActive
//@input Component.SpriteVisual sprite


var currLabel = script.label.getFirstComponent('Component.Label').text;
var currName = script.getSceneObject().getParent().getParent().name;
var KeyIsSet = false;


// materials
if(global.KeyboardIDOnOff == currName){
	var oV = script.FadingSprite.getMaterial(0).getPass(0).baseColor;
	script.FadingSprite.getMaterial(0).getPass(0).baseColor = new vec4(oV.x, oV.y, oV.z, 1);
}else{
	script.sprite.clearMaterials();
	script.sprite.addMaterial(script.KeyIdle);
}


if(global.KeyboardIDSymbolsKey == currName){ // numbers & symbols toggle

	global.KeyboardSymbolsTab = !global.KeyboardSymbolsTab; // change keyboard layout to symbols or to normal characters
	global.KeyboardResetKeysFunc(); // call funcion from 'Board.js' to reset the board layout

	KeyIsSet = true;

}

if (global.KeyboardIDShiftKey == currName){ // shift

	global.KeyboardShiftTab = !global.KeyboardShiftTab; // shift toggle
	global.KeyboardResetKeysFunc(); // call funcion from 'Board.js' to reset the board layout

	// shift key material
	if(global.KeyboardShiftTab){
		script.sprite.clearMaterials();
		script.sprite.addMaterial(script.KeyActive);
	}

	KeyIsSet = true;

}

if (global.KeyboardIDBackspace == currName){ // backspace

	var IsString = (Object.prototype.toString.call(global.KeyboardOut[global.KeyboardCurrentLine]) === '[object String]');

	global.KeyboardOut[global.KeyboardCurrentLine] = IsString ? global.KeyboardOut[global.KeyboardCurrentLine].substring(0, global.KeyboardOut[global.KeyboardCurrentLine].length - 1) : ''; // remove characters from final string

	KeyIsSet = true;

}

if (global.KeyboardIDSpace == currName){ // space

	global.KeyboardOut[global.KeyboardCurrentLine] += ' '; // space

	KeyIsSet = true;

}

if (global.KeyboardIDOnOff == currName){ // hide/show toggle

	if(!global.ButtonCooldown){

		global.KeyboardSwitch();

		global.KeyboardOnOffSwitch.getChild(0).getChild(1).getFirstComponent("Component.Label").text = global.KeyboardVisible ? global.KeyboardHidePanelChar : global.KeyboardShowPanelChar;

	}

	KeyIsSet = true;

}

if (global.KeyboardIDClear == currName){ // clear

	global.KeyboardOut[global.KeyboardCurrentLine] = '';

	KeyIsSet = true;

}

if (global.KeyboardIDLineUp == script.getSceneObject().getParent().name){

	if(global.KeyboardCurrentLine != 1){
		global.KeyboardCurrentLine -= 1;
		script.getSceneObject().getParent().getParent().getChild(1).getChild(0).enabled = true;
		script.getSceneObject().getParent().getParent().getChild(1).getChild(1).enabled = true;
	}

	if(global.KeyboardCurrentLine == 1){
		script.getSceneObject().getParent().enabled = false;
	}


	script.getSceneObject().getParent().getParent().getChild(1).getChild(2).getFirstComponent("Label").text = (global.KeyboardCurrentLine).toString() + '/' + global.KeyboardMaxLines.toString();

	var currText = global.KeyboardOut[global.KeyboardCurrentLine];
	var IsString = (Object.prototype.toString.call(currText) === '[object String]');
	if(!IsString){
		global.KeyboardOut[global.KeyboardCurrentLine] = "";
	}
		
	KeyIsSet = true;

}

if (global.KeyboardIDLineDown == script.getSceneObject().getParent().name){

	if(global.KeyboardCurrentLine != global.KeyboardMaxLines){
		global.KeyboardCurrentLine += 1;
		script.getSceneObject().getParent().getParent().getChild(0).enabled = true;
	}

	if(global.KeyboardCurrentLine == global.KeyboardMaxLines){
		script.getSceneObject().getParent().getChild(1).enabled = false;
		script.getSceneObject().getParent().getChild(0).enabled = false;
	}
	
	script.getSceneObject().getParent().getChild(2).getFirstComponent("Label").text = (global.KeyboardCurrentLine).toString() + '/' + global.KeyboardMaxLines.toString();
	
	var currText = global.KeyboardOut[global.KeyboardCurrentLine];
	var IsString = (Object.prototype.toString.call(currText) === '[object String]');
	if(!IsString){
		global.KeyboardOut[global.KeyboardCurrentLine] = "";
	}

	KeyIsSet = true;

}

if (!KeyIsSet){ // all other normal keys

	global.KeyboardOut[global.KeyboardCurrentLine] += currLabel; // add characters to final string

	KeyIsSet = true;

}

global.KeyboardPlayKeySound();