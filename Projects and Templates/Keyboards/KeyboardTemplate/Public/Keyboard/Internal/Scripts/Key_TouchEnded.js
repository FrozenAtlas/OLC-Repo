// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input Asset.Material KeyIdle
//@input Asset.Material KeyActive
//@input Asset.Material ToggleIdle
//@input Component.Image img

// key disabled (grayed out)
script.api.gray = false;


// store when done setting a key
var KeyIsSet = false;




// do not press buttons during animation
if( !global.KeyboardButtonCooldown ){



	var i = script.api.keyIndex;


	// toggle
	if(i == 33){

		// only if not currently in cooldown
		if(!global.KeyboardButtonCooldown){

			script.img.clearMaterials();
			script.img.addMaterial(script.ToggleIdle);

			var oV = script.img.getMaterial(0).getPass(0).baseColor;
			script.img.getMaterial(0).getPass(0).baseColor = new vec4(oV.x, oV.y, oV.z, 1);


			// call switch function
			global.KeyboardSwitch();

		}

		KeyIsSet = true;

	}




	if(!KeyIsSet){

		// material back to normal
		script.img.clearMaterials();
		script.img.addMaterial(script.KeyIdle);

	}




	// symbols toggle
	if(i == 30){
		
		// change keyboard layout to symbols or to normal characters
		global.KeyboardSymbolsTab = !global.KeyboardSymbolsTab;

		// call funcion to reset the board layout
		global.KeyboardResetKeysFunc();

		// done
		KeyIsSet = true;

	}



	// shift
	if (i == 28){ 

		// shift toggle
		global.KeyboardShiftTab = !global.KeyboardShiftTab;

		// call funcion to reset the board layout
		global.KeyboardResetKeysFunc();


		// shift key material
		if(global.KeyboardShiftTab){

			script.img.clearMaterials();
			script.img.addMaterial(script.KeyActive);

		}


		// done
		KeyIsSet = true;

	}



	// backspace
	if (i == 29){

		// check if current line on keyboard is a string
		var IsString = (Object.prototype.toString.call(global.KeyboardOut[global.KeyboardCurrentLine]) === '[object String]');

		// remove characters from final string
		global.KeyboardOut[global.KeyboardCurrentLine] = IsString ? global.KeyboardOut[global.KeyboardCurrentLine].substring(0, global.KeyboardOut[global.KeyboardCurrentLine].length - 1) : '';

		// done
		KeyIsSet = true;

	}



	// space
	if (i == 32){ 

		// add space
		global.KeyboardOut[global.KeyboardCurrentLine] += ' '; 

		// done
		KeyIsSet = true;

	}



	// clear
	if (i == 31){

		// clear current line
		global.KeyboardOut[global.KeyboardCurrentLine] = '';

		// done
		KeyIsSet = true;

	}



	// line up
	if (i == 26){

		if(!script.api.gray){

			// add one to current line
			global.KeyboardCurrentLine += 1;

			// make string if not already one there at that index
			var currText = global.KeyboardOut[global.KeyboardCurrentLine];
			var IsString = (Object.prototype.toString.call(currText) === '[object String]');
			if(!IsString){
				global.KeyboardOut[global.KeyboardCurrentLine] = "";
			}

		}


		// done
		KeyIsSet = true;

	}



	// line down
	if (i == 27){

		if(!script.api.gray){

			// subtract one from current line
			global.KeyboardCurrentLine -= 1;

			// make string if not already one there at that index
			var currText = global.KeyboardOut[global.KeyboardCurrentLine];
			var IsString = (Object.prototype.toString.call(currText) === '[object String]');
			if(!IsString){
				global.KeyboardOut[global.KeyboardCurrentLine] = "";
			}

		}


		// done
		KeyIsSet = true;

	}




	// all other normal keys
	if(!KeyIsSet){

		// add character to string at current line
		global.KeyboardOut[global.KeyboardCurrentLine] += script.api.ch;

	}




	// gray out up/down keys
	if(i == 26 || i == 27){
		global.UpDownGrayedOut();
	}

}