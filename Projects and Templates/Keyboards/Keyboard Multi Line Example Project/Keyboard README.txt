|| Max van Leeuwen - maxvanleeuwen.com/lens-studio-keyboard
|| snap, insta, twitter @ maxeflats
|| Keyboard v0.2

**** DOES NOT WORK ON LENS STUDIO 2.0.0 AND UP ****


|| Install


1. Import the 'Keyboard.oprfb' and drop the prefab 'Keyboard' into your scene.

2. Go to 'Resources > Add New > Texture > From Camera > Keyboard/Keyboard:Camera'

3. On that Camera Texture, enable 'Use as Output'. Done! A flashing button should now appear in the bottom right of the screen. Tap on it to make the keyboard appear.




|| How to use without programming


From the 'Keyboard_Resources' folder, drag & drop the 'FetchKeyboardOutput' script to an object.
Assign the label you want to forward the text to (or let the script automatically find the label component if it's on the same object),
and (optionally) change the 'Line' parameter to choose what line you want to read (if muli-line text is enabled in the settings).








|| Tips & Tricks


To quickly change the colours/materials of the keys, simply edit the Materials in the Resources folder.

To set a default text, type it into the 'Default Text' textbox in the Keyboard settings.
To make a multi-line default text, add '\n' (without quotation marks) where you want a line split. 
For example: "First line.\nSecond line." would become:
"First line."
"Second Line."

To change the look of all keys simultaneously, delete all but one key in the 'Keyboard/Keyboard/KeyboardObject/Keys' object in the scene.
Simply change the look of the one remaining key to your likings, and duplicate it 30 times again.
The Keyboard script will automatically place the duplicated keys correctly and add their labels and all that.




|| Javascript use


global.KeyboardResult()
	Function - Get the keyboard output. Use an int value as optional argument to ask for a specific line! (E.g. 'global.KeyboardResult(3)' for line 3.)

global.KeyboardSwitch();
	Function - Show/hide the keyboard toggle.

global.KeyboardPlayKeySound();
	Function - Plays the sound (if added in the UI) on key press.


global.KeyboardVisible;
	Bool - Check if keyboard is currently visible.

global.KeyboardHideWhenRecording;
	Bool - Check if the Keyboard will be hidden when recording.

global.KeyboardMaxLines;
	Int - Get the amount of lines allowed to scroll through.