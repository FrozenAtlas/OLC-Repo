// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


// Event: Lens Turned On


//@ui {"widget":"label", "label":"Keyboard settings"}
//@ui {"widget":"separator"}

//@ui {"widget":"label", "label":""}
//@ui {"widget":"label", "label":"Keyboard 0.3"}
//@ui {"widget":"label", "label":"Max van Leeuwen"}
//@ui {"widget":"label", "label":"SC/Insta/Twitter: @maxeflats"}
//@ui {"widget":"label", "label":"maxvanleeuwen.com/lens-studio-keyboard"}
//@ui {"widget":"label", "label":""}

//@ui {"widget":"label", "label":"Defaults"}
//@ui {"widget":"separator"}

//@ui {"widget":"label", "label":""}
//@ui {"widget":"label", "label":"Click the arrow on the left to edit default text:"}
//@input string[] DefaultTextLines
//@ui {"widget":"label", "label":""}

//@input int MultiLineCount = 1 {"min":1, "max":15}
//@input bool VisibleOnStart = true
//@input bool AskForAttention = true {"showIf":"VisibleOnStart", "showIfValue":"false"}
//@input bool SymbolsKey = true
//@input bool OnOffSwitch = true
//@input bool ShiftKey = true
//@input bool ClearKey = true
//@input bool Dark = true
//@input bool ShowPreview = true
//@input bool HideWhenRecording = true
//@input string Characters = "qwertyuiopasdfghjklzxcvbnm"
//@input string CharactersCaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
//@input string Symbols = "1234567890!@#%?_-&|<()+.,>"
//@input string SymbolsCaps = "~`^\'\"\\[]{}$€£¥∞-=*/:;°™©•√"
//@ui {"widget":"label", "label":""}
//@input float FontSize = 12 {"widget":"slider", "min":1.0, "max":40.0, "step":0.01}
//@input Asset.Font Font

//@ui {"widget":"label", "label":""}
//@ui {"widget":"label", "label":"Position / Scale"}
//@ui {"widget":"separator"}

//@input float boundLeft = -.95 {"widget":"slider", "min":-1, "max":1, "step":0.001}
//@input float boundRight = .95 {"widget":"slider", "min":-1, "max":1, "step":0.001}
//@input float boundTop = 1 {"widget":"slider", "min":-1, "max":2, "step":0.001}
//@input float boundBottom = -.4 {"widget":"slider", "min":-1, "max":1, "step":0.001}
//@input float keyWidth = .18 {"widget":"slider", "min":0.01, "max":0.4, "step":0.01}
//@input float keyHeight = .20 {"widget":"slider", "min":0.01, "max":0.8, "step":0.01}
//@input float rowDistance = .21 {"widget":"slider", "min":0.01, "max":0.5, "step":0.01}
//@input float AnimationSpeed = .15 {"widget":"slider", "min":0.01, "max":2, "step":0.01}

//@ui {"widget":"label", "label":""}
//@ui {"widget":"label", "label":"Special key labels"}
//@ui {"widget":"separator"}

//@input string CharactersToSymbols = "..."
//@input string SymbolsToCharacters = "abc"
//@input string HidePanel = "↓"
//@input string ShowPanel = "↑"
//@input string Shift = "↑"
//@input string Backspace = "←"
//@input string Space = ""
//@input string Clear = "×"




// placeholders for sceneobjects to find later
var Keys;
var TextTouchCatcher;
var TouchProtect;
var Toggle;




// all keys + 1 toggle key
var keys_children = 33;
var keys_other = 1;
var keyCount = keys_children + keys_other;




// get KeyboardCam
var KeyboardCam = script.getSceneObject().getChild(0);

// auto-find right objects
for(i = 0; i < KeyboardCam.getChildrenCount(); i++){

	var currChild = KeyboardCam.getChild(i);

	if(currChild.name == 'Keys'){
		Keys = currChild;
	}
	if(currChild.name == 'TextTouchCatcher'){
		TextTouchCatcher = currChild;
	}
	if(currChild.name == 'TouchProtect'){
		TouchProtect = currChild;
	}
	if(currChild.name == 'Toggle'){
		Toggle = currChild;
	}

}




// int for current line (start typing at 1)
global.KeyboardCurrentLine = 0;

// set default lines (first, make string array type, then load all user-string lines - this way, the type will be correct even if the user hasn't typed anything in the default)
global.KeyboardOut = [""]
for (var i = script.DefaultTextLines.length - 1; i >= 0; i--) {
 	global.KeyboardOut[i] = script.DefaultTextLines[i];
}



// set global vars
global.KeyboardMaxLines             = script.MultiLineCount;     // set maximum amount of allowed lines for keyboard output
global.KeyboardVisible              = script.VisibleOnStart;    // check if panel is visible
global.KeyboardSymbolsTab           = false;                    // check if currently in symbols tab
global.KeyboardShiftTab             = false;                    // check if currently in shift/alternative tab
global.KeyboardSpaceWidth           = script.spaceWidth         // set space width for Key_Start.js
global.KeyboardHideWhenRecording    = script.HideWhenRecording  // hide when recording
global.KeyboardStopAttention        = !script.AskForAttention   // ask for attention if keyboard is not visible by default




// function for asking the current keybboard text at a specific line
global.KeyboardResult = function(line){

	if(line == null){
		var output = global.KeyboardOut[0];
		var IsString = (Object.prototype.toString.call(output) === '[object String]');
		return IsString ? output : "";
	}
	else{
		var output = global.KeyboardOut[line];
		var IsString = (Object.prototype.toString.call(output) === '[object String]');
		return IsString ? output : "";
	}

}




// set toggle key
function setToggleKey(){

	if(global.KeyboardVisible){
		ch = script.HidePanel;
	}else{
		ch = script.ShowPanel;
	}

	NewKey = Toggle.getChild(0);
	NewKey.getFirstComponent("Text").text = ch;

}




// function to run on update (check if recording, hide keyboard if needed)
function CheckIfRecording (eventData){

	if(global.scene.isRecording()){

		if(global.KeyboardHideWhenRecording){

			// disable when recording
			script.getSceneObject().enabled = false;

		}

	}

}

// bind to update
var checkrecording_event = script.createEvent("UpdateEvent");
checkrecording_event.bind(CheckIfRecording);




// stop asking for attention
function stopAskingForAttention (eventData)
{

	if(global.KeyboardStopAttention || global.KeyboardVisible){

		// stop tween
		global.tweenManager.stopTween(Toggle.getChild(0), "AskForAttention");
		global.tweenManager.resetObject(Toggle.getChild(0), "AskForAttention");

	}

}

// bind to update
var stopattention_event = script.createEvent("UpdateEvent");
stopattention_event.bind(stopAskingForAttention);




// function to gray out the line up/down keys
global.UpDownGrayedOut = function(){

	// go to Keys object, get child with inndex of up and down
	var up = Keys.getChild(26);
	var down = Keys.getChild(27);


	// if at maximum line, disable up
	if(global.KeyboardCurrentLine == global.KeyboardMaxLines - 1){
		
		up.getFirstComponent("Component.ScriptComponent").api.gray = true;
		up.getFirstComponent("Component.Image").enabled = false;
	
	}else{

		up.getFirstComponent("Component.ScriptComponent").api.gray = false;
		up.getFirstComponent("Component.Image").enabled = true;
	
	}



	// if at minimum line, disable down
	if(global.KeyboardCurrentLine == 0){
		
		down.getFirstComponent("Component.ScriptComponent").api.gray = true;
		down.getFirstComponent("Component.Image").enabled = false;
	
	}else{

		down.getFirstComponent("Component.ScriptComponent").api.gray = false;
		down.getFirstComponent("Component.Image").enabled = true;
	
	}

}




global.KeyboardEnableDisable = function(EnableDisable){

	// prevent switch when the animation is still playing
	global.KeyboardButtonCooldown = true;




	// countdown event
	var switchEnabled = script.createEvent("DelayedCallbackEvent");
	switchEnabled.bind(function(eventData)
	{

		// get children
		var count = Keys.getChildrenCount();

		var i = 0;
		while (i < count){

			// disable or enable
			Keys.getChild(i).enabled = EnableDisable; 

			i++;

		}

		// switch touch protection as well
		TouchProtect.enabled = EnableDisable;


		// reset keyboard layout on return to fix all enabled objects that should be disabled
		if(EnableDisable){
			global.KeyboardResetKeysFunc();
		}

	});



	// countdown event for cooldown
	var cooldown = script.createEvent("DelayedCallbackEvent");
	cooldown.bind(function(eventData)
	{
		// cooldown over
		global.KeyboardButtonCooldown = false;

	});




	// immediately enable children when animating in, otherwise wait for them to be out of screen
	switchEnabled.reset(EnableDisable ? 0 : script.AnimationSpeed);

	// cooldown will take some time
	cooldown.reset(script.AnimationSpeed);

}




// function to set bounds (anchors) from vec4
function setBounds(rect, vec){

	rect.left = vec.x;
	rect.right = vec.y;
	rect.top = vec.z;
	rect.bottom = vec.w;

}




// function to switch visibility for keyboard
global.KeyboardSwitch = function(){

	if(global.KeyboardVisible){

		global.tweenManager.startTween(Keys, "disappear");

		if(script.Dark){
			global.tweenManager.startTween(TouchProtect, "fadeOut");
		}

		TextTouchCatcher.enabled = false;

		global.KeyboardEnableDisable(false);

	}else{

		global.tweenManager.startTween(Keys, "appear");

		if(script.Dark){ 
			global.tweenManager.startTween(TouchProtect, "fadeIn");
		}

		if(script.ShowPreview){
			TextTouchCatcher.enabled = true;
		}

		global.KeyboardEnableDisable(true);

	}

	global.KeyboardVisible = !global.KeyboardVisible;
	setToggleKey();

	global.KeyboardStopAttention = true;

}




// function to build keyboard layout
global.KeyboardResetKeysFunc = function(){

	// get new bounds
	var newBounds = new vec4(script.boundLeft, script.boundRight, script.boundTop, script.boundBottom);

	// set new bounds for Keys, Toggle
	setBounds( Keys.getFirstComponent("Component.ScreenTransform").anchors, newBounds );
	setBounds( Toggle.getFirstComponent("Component.ScreenTransform").anchors, newBounds );

	// make new bounds for key, based on position and scale (l, r, t, b)
	var newTextBounds = new vec4(script.boundLeft, script.boundRight, script.boundTop, script.boundBottom - 1 + (4 + 3/4) * script.rowDistance);

	// set new bounds for text
	setBounds( TextTouchCatcher.getFirstComponent("Component.ScreenTransform").anchors, newTextBounds);

	// set preview text font
	TextTouchCatcher.getChild(0).getFirstComponent("Component.Text").size = script.FontSize;
	TextTouchCatcher.getChild(0).getFirstComponent("Component.Text").font = script.Font;



	// set tween time (for all tweens, in both Keys and TouchProtect)
	var Tweens = Keys.getAllComponents().concat(TouchProtect.getAllComponents());
	for (var i = Tweens.length - 1; i >= 0; i--) {
		if(Tweens[i].getTypeName() == "Component.ScriptComponent"){

			Tweens[i].api.time = script.AnimationSpeed;

		}
	}




	// for each key
	var i = 0
	while(i < keyCount){

		// for keys that are not children, set NewKey to temporary placeholder children - 1
		var NewKey = Keys.getChild( i >= keys_children - 1 ? keys_children - 1 : i );


		// remember position
		var p = new vec2(0, 0);
		// remember size
		var s = new vec2(0, 0);
		// remember index
		var k = 0;




		// first row (qwertyuiop) / (1234567890)
		var row1 = 10

		// get distance between keys according to first row
		var distance = 2 / row1;

		if(i < row1){

			// x: i * distance, starting at left bounds (-1)
			// y: this is the first row top to bottom, which is the fourth from the bottom (again, starting at bottom bounds, -1)
			p = new vec2(distance * (i + 1/2) - 1, -1 + 3 * script.rowDistance);

			// x/y: user params
			s = new vec2(script.keyWidth, script.keyHeight);

		}



		// second row (asdfghjkl) / (~`!@#$%^&)
		var row2 = 9
		if(i >= row1 && i < (row1 + row2)){

			// local i
			j = i - row1;

			// x: j * distance, starting at left bounds (-1)
			// y: this is the second row, so third from the bottom (again, starting at bottom bounds, -1)
			p = new vec2( (j + 1) * distance - 1, -1 + 2 * script.rowDistance );

			// x/y: user params
			s = new vec2(script.keyWidth, script.keyHeight);

		}



		// third row (zxcvbnm)/(*()_-+=)
		var row3 = 7
		if(i >= (row1 + row2) && i < (row1 + row2 + row3)){

			// local i
			j = i - (row1 + row2);


			// x: j * distance, starting at left bounds (-1)
			// y: this is the first row, so second from the bottom (again, starting at bottom bounds, -1)
			p = new vec2( (j + 2) * distance - 1, -1 + 1 * script.rowDistance );

			// x/y: user params
			s = new vec2(script.keyWidth, script.keyHeight);

		}




		// line up/down keys
		if(i == 26){

			p = new vec2( distance * (row1 - 1/2) - 1, -1 + (5 + 1/4) * script.rowDistance );
			s = new vec2(script.keyWidth, script.keyHeight);

		}
		if(i == 27){

			p = new vec2( distance * (row1 - 1/2) - 1, -1 + (4 + 1/4) * script.rowDistance );
			s = new vec2(script.keyWidth, script.keyHeight);

		}



		// shift/backspace keys
		if(i == 28){

			p = new vec2( 1/2 * distance - 1, -1 + 1 * script.rowDistance );
			s = new vec2(script.keyWidth, script.keyHeight);

		}
		if(i == 29){

			p = new vec2( distance * (row1 - 1/2) - 1, -1 + 1 * script.rowDistance );
			s = new vec2(script.keyWidth, script.keyHeight);

		}



		// symbols/clear keys
		if(i == 30){

			p = new vec2( 1/2 * distance - 1, -1 );
			s = new vec2(script.keyWidth, script.keyHeight);

		}
		if(i == 31){

			p = new vec2( distance * (row1 - 1 - 1/2) - 1, -1 );
			s = new vec2(script.keyWidth, script.keyHeight);

		}



		// space bar key
		if(i == 32){

			p = new vec2( distance * (row1 / 2) - 1, -1 );
			s = new vec2( distance * row1 / 2, script.keyHeight);

		}



		// toggle key
		if(i == 33){

			NewKey = Toggle.getChild(0);
			p = new vec2( distance * (row1 - 1/2) - 1, -1 );
			s = new vec2(script.keyWidth, script.keyHeight);

		}




		// get i values for row characters
		var rows = row1 + row2 + row3;



		// get key labels
		var ch = '';
		
		if (i < rows){

			if(global.KeyboardSymbolsTab){

				if(global.KeyboardShiftTab){
					ch = script.SymbolsCaps[i];

					// fix backslash escape characters
					if(ch == "\\"){
						ch = "\\\\";
					}

				}else{
					ch = script.Symbols[i];
				}

			}else{

				if(global.KeyboardShiftTab){
					ch = script.CharactersCaps[i];
				}else{
					ch = script.Characters[i];
				}
				
			}

		}




		// make new bounds for key, based on position and scale (l, r, t, b)
		var newBounds = new vec4(p.x - s.x/2, p.x + s.x/2, p.y + s.y/2, p.y - s.y/2);

		// set new bounds for key
		setBounds( NewKey.getFirstComponent("Component.ScreenTransform").anchors, newBounds);

		// set font size (a bit smaller for function keys)
		NewKey.getFirstComponent("Component.Text").size = i < rows ? script.FontSize : script.FontSize / (3/2);
		NewKey.getFirstComponent("Component.Text").font = script.Font;

		// set key index
		NewKey.getFirstComponent("Component.ScriptComponent").api.setIndex(i, ch);



		if (i == 26){
			ch = "↑";
		}

		if (i == 27){
			ch = "↓";
		}


		if (i == 28){
			ch = script.Shift;
		}

		if (i == 29){
			ch = script.Backspace;
		}

		if (i == 30){

			if(global.KeyboardSymbolsTab){
				ch = script.SymbolsToCharacters;
			}else{
				ch = script.CharactersToSymbols;
			}

		}

		if (i == 31){
			ch = script.Clear;
		}

		if (i == 32){
			ch = script.Space;
		}
		

		// set key label
		NewKey.getFirstComponent("Component.Text").text = ch;



		// overwrite toggle key
		if (i == 33){
			setToggleKey(global.KeyboardVisible);
		}



		// disable keys that shouldn't be there
		if(i == 26 || i == 27){
			NewKey.enabled = (global.KeyboardMaxLines > 1) && script.ShowPreview;
		}
		if(i == 28){
			NewKey.enabled = script.ShiftKey;
		}
		if(i == 30){
			NewKey.enabled = script.SymbolsKey;
		}
		if(i == 31){
			NewKey.enabled = script.ClearKey;
		}
		if(i == 33){
			NewKey.enabled = script.OnOffSwitch;
		}


		// i one up
		i ++;

	}



	// other stuff to take care of when keyboard is not visible
	if(!global.KeyboardVisible){

		var i = 0;
		while (i < keys_children){

			// disable or enable
			Keys.getChild(i).enabled = false; 
			i++;

		}

		// set offset to keys bounds to compensate in-animation (tween)
		var anch = Keys.getFirstComponent("Component.ScreenTransform").anchors;
		var newBounds = new vec4(anch.left, anch.right, anch.top - 2, anch.bottom - 2);
		setBounds( Keys.getFirstComponent("Component.ScreenTransform").anchors, newBounds);

		// switch touch protection as well
		TouchProtect.enabled = false;

		// preview label invisible
		TextTouchCatcher.enabled = false;


	}else{

		// if visible by default, make the black background visible as well (if enabled)
		if(script.Dark){
			TouchProtect.getFirstComponent("Component.Image").getMaterial(0).mainPass.baseColor = new vec4(0, 0, 0, 0.7);
		}else{
			TouchProtect.getFirstComponent("Component.Image").getMaterial(0).mainPass.baseColor = new vec4(0, 0, 0, 0);
		}


		// check if preview label should be visible
		TextTouchCatcher.enabled = script.ShowPreview;

		// stop Toggle key asking for attention
		global.KeyboardStopAttention = true;

	}




	// line up/down keys
	global.UpDownGrayedOut();




	// if asking for attention (and keyboard is not visible by default)
	if(!global.KeyboardVisible && script.AskForAttention && !global.KeyboardStopAttention){
		global.tweenManager.startTween(Toggle.getChild(0), "AskForAttention");
	}

}



// start building layout
global.KeyboardResetKeysFunc();