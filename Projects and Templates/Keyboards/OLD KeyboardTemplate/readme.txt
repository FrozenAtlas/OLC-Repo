|| Max van Leeuwen - maxvanleeuwen.com
|| snap, insta, twitter @ maxeflats

**** THIS DOES NOT WORK ON LENS STUDIO 2.0.0 AND UP ****

|| Install

1. Import the 'Keyboard.oprfb' and drop the prefab into your scene.

2. Go to 'Resources > Add New > 'Texture > From Camera > Keyboard/Keyboard:Camera'

3. On that Camera Texture, enable 'Use as Output'.




|| Some tricks

In the 'Keyboard_Resources' folder, use the 'FetchKeyboardOutput' script (set to 'Frame Updated') to forward the keyboard output to a label.
Or get the keyboard output data using 'global.KeyboardOut' in JavaScript.

To change the look of all keys simultaneously, delete all but one key in the 'Keyboard/Keyboard/KeyboardObject/Keys' object in the scene.
Simply change the look of the remaining key to your likings and duplicate it 30 times again.
The script will automatically place the duplicated keys correctly and add their labels and all that.




|| Some more useful things

// get/set keyboard text (string)
// set the script to 'Frame Updated'
global.KeyboardOut;


// show/hide keyboard toggle (function call)
global.KeyboardSwitch();


// check if keyboard is currently visible (bool)
global.KeyboardVisible;