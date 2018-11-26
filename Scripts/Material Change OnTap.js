// Made by Jacob
// Use in "Initialize" event
// @input Component.MeshVisual meshVisual
// @input Asset.Material[] materials

// Our starting texture index
var currentItemIndex = 0;

// Function to clear the current materials and add a new one
function setMaterial(material){
 script.meshVisual.clearMaterials();
 script.meshVisual.addMaterial(material);
}

// Assign the initial material to our meshVisual
setMaterial(script.materials[currentItemIndex]);

// Define what happens when you tap.
function changeMaterial () {

 // Increment the current item index
 currentItemIndex += 1;

 // We need the current item index to wrap around 
 // once it's higher than the number of items we have.
 currentItemIndex = currentItemIndex % script.materials.length;

 // Change the mesh's material
 setMaterial(script.materials[currentItemIndex]);
}

// Bind the function to the tap event.
var touchEvent = script.createEvent("TapEvent");
touchEvent.bind(changeMaterial);