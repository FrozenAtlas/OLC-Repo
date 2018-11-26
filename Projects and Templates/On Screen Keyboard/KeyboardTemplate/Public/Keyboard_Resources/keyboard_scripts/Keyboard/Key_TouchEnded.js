// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input SceneObject label
//@input Asset.Material KeyIdle
//@input Asset.Material KeyActive
//@input Asset.Material ToggleIdle
//@input Component.SpriteVisual sprite


var currLabel = script.label.getFirstComponent('Component.Label').text;
var currName = script.getSceneObject().getParent().getParent().name;
var KeyIsSet = false;


// materials
script.sprite.clearMaterials();
if(global.OnOff == currName){
	script.sprite.addMaterial(script.ToggleIdle);
}else{
	script.sprite.addMaterial(script.KeyIdle);
}


if(global.SymbolsKey == currName){ // numbers & symbols toggle

    global.KeyboardSymbolsTab = !global.KeyboardSymbolsTab; // change keyboard layout to symbols or to normal characters
    global.KeyboardResetKeysFunc(); // call funcion from 'Board.js' to reset the board layout

    KeyIsSet = true;

}

if (global.ShiftKey == currName){ // shift

	global.KeyboardShiftTab = !global.KeyboardShiftTab; // shift toggle
	global.KeyboardResetKeysFunc(); // call funcion from 'Board.js' to reset the board layout

	// shift key material
	if(global.KeyboardShiftTab){
		script.sprite.clearMaterials();
		script.sprite.addMaterial(script.KeyActive);
	}

	KeyIsSet = true;

}

if (global.Backspace == currName){ // backspace

	var IsString = (Object.prototype.toString.call(global.KeyboardOut) === '[object String]');

	global.KeyboardOut = IsString ? global.KeyboardOut.substring(0, global.KeyboardOut.length - 1) : ''; // remove characters from final string

	KeyIsSet = true;

}

if (global.Space == currName){ // space

	global.KeyboardOut += ' '; // space

	KeyIsSet = true;

}

if (global.OnOff == currName){ // hide/show toggle

	if(!global.ButtonCooldown){

		global.KeyboardSwitch();

		global.KeyboardOnOffSwitch.getChild(0).getChild(1).getFirstComponent("Component.Label").text = global.KeyboardVisible ? global.KeyboardHidePanelChar : global.KeyboardShowPanelChar;

	}

	KeyIsSet = true;

}

if (global.Clear == currName){ // clear

	global.KeyboardOut = '';

	KeyIsSet = true;

}

if (!KeyIsSet){ // all other normal keys

	global.KeyboardOut += currLabel; // add characters to final string

	KeyIsSet = true;

}