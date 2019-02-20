//@input SceneObject objectWithTweens
//@input SceneObject sceneObject

// Toggle between red, white, and blue based on value provided by TweenValue
function toggleColors()
{
    var tweenValue = global.tweenManager.getGenericTweenValue( script.objectWithTweens, "tween_value" );

    var visualComponent = script.sceneObject.getFirstComponent("Component.MeshVisual");

    if ( tweenValue <= 1)
    {
        visualComponent.getMaterial(0).getPass(0).baseColor = new vec4(1, 0, 0, 1);
    }
    else if ( tweenValue <= 2)
    {
        visualComponent.getMaterial(0).getPass(0).baseColor = new vec4(1, 1, 1, 1);
    }
    else
    {
        visualComponent.getMaterial(0).getPass(0).baseColor = new vec4(0, 0, 1, 1);

    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(toggleColors);
