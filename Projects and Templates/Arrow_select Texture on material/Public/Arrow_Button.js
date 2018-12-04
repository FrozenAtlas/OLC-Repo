
//@input int direction {"widget":"combobox", "values":[{"label":"forward", "value":1}, {"label":"backward", "value":-1}]};


//@ui {"widget":"label", "label":"Optional Tween"}
//@input string tweenName = "scale";
//@input SceneObject objectWithTweens


var direction = script.direction;
    
function onTapped(eventData)
{
    global.cycleTexture(direction);
    
    
    //optional animation for the arrow on tap
    if (script.objectWithTweens)
        {
        global.tweenManager.startTween(script.objectWithTweens, script.tweenName);
    }
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);