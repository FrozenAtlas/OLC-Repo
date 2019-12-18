// -----JS CODE-----
// SnapTexture.js
// Version: 0.0.1
// Event: Initialized
// Description: A helper script that allows you to projects screen positions from camera’s view onto the mesh’s UVs

// @input bool advanced = false
// @input Component.Camera mainCamera {"showIf": "advanced"}
// @input Component.BaseMeshVisual faceMeshVisual {"showIf": "advanced"}
// @input SceneObject headBinding {"showIf": "advanced"}

var duplicatedFaceMeshObject;
var duplicatedMesh;
var init = false;

initialized();

function initialized()
{
    if(checkInputValues())
    {
        var thisSceneObject = script.faceMeshVisual.getSceneObject();
        duplicatedFaceMeshObject = script.headBinding.copyWholeHierarchy(thisSceneObject);
        duplicatedFaceMeshObject.getTransform().setLocalPosition(vec3.zero());
        duplicatedMesh = duplicatedFaceMeshObject.getComponent("Component.BaseMeshVisual");
        duplicatedMesh.enabled = false;
        init = true;
    }
}

function onUpdateEvent(eventData)
{
    if(init && duplicatedFaceMeshObject != null && duplicatedMesh != null)
    {
        duplicatedMesh.snap(script.mainCamera);
    }
}

function checkInputValues()
{
    if( !script.mainCamera )
    {
        print( "SnapTexture, Error: Make sure the Camera object exists and is set under the Advanced checkbox" );
        return false;
    }
    
    if( !script.faceMeshVisual )
    {
        print( "SnapTexture, Error: Make sure the Face Mesh object exists and is set under the Advanced checkbox" );
        return false;
    }

    if( !script.headBinding )
    {
        print( "SnapTexture, Error: Make sure the Head Binding object exists and is set under the Advanced checkbox" );
        return false;
    }

    return true;
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdateEvent); 