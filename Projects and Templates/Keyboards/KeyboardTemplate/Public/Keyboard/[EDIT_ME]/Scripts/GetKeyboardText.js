// Max van Leeuwen - maxvanleeuwen.com/lens-studio-keyboard
// snap, insta, twitter @ maxeflats


// Drop on a Scene Object to read the Keyboard output to a label!
// See the readme-file for help.


//@input Component.Text TextPreview
//@input bool CurrentlyActiveLine
//@input int line = 1 {"min":1, "showIf":"CurrentlyActiveLine", "showIfValue":"false"}



// placeholder
var component;


// function to run on update (so user does not have to set the script to Frame Updated manually)
function EveryFrame (eventData)
{

	var whatLine = script.CurrentlyActiveLine ? global.KeyboardCurrentLine : script.line - 1;
	component.text = global.KeyboardResult(whatLine);
}

// start event
var event = script.createEvent("UpdateEvent");



// use the Text component selected by the user, or find already existing one on object
try{

	if(script.TextPreview){
		component = script.TextPreview;
	}else{
		component = script.getSceneObject().getFirstComponent("Text");
	}

	event.bind(EveryFrame);

}catch(err){

	// if no text component can be found and none was selected, print error
	print("[GetKeyboardText] No label input specified on " + script.getSceneObject().name);

}