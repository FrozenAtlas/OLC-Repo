// Max van Leeuwen - maxvanleeuwen.com/lens-studio-keyboard
// snap, insta, twitter @ maxeflats

// Drop on a Scene Object to read the Keyboard output to a label!
// See the readme-file for help!


//@input Component.Label TextPreview
//@input bool CurrentlyActiveLine
//@input int line = 1 {"min":1, "showIf":"CurrentlyActiveLine", "showIfValue":"false"}


var component;


function EveryFrame (eventData)
{
	var whatLine = script.CurrentlyActiveLine ? global.KeyboardCurrentLine : script.line;
	component.text = global.KeyboardResult(whatLine)
}
var event = script.createEvent("UpdateEvent");


try{
	if(script.TextPreview){
		component = script.TextPreview;
	}else{
		component = script.getSceneObject().getFirstComponent("Label");
	}

	event.bind(EveryFrame);
}catch(err){
	print("[Keyboard] No label input specified on SceneObject: " + script.getSceneObject().name);
}