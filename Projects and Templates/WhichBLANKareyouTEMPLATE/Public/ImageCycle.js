// @input Asset.Material sprite
// @input Asset.Texture[] textures

// Our starting texture index
var currentItemIndex = 0;
var count = 0;

// Assign the initial texture to our sprite
script.sprite.mainPass.baseTex = script.textures[currentItemIndex]

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData){
    if (count == 0){
        currentItemIndex += 1;
        currentItemIndex = currentItemIndex % script.textures.length;
        script.sprite.mainPass.baseTex = script.textures[currentItemIndex];
    }
});



var event = script.createEvent("MouthOpenedEvent");
event.faceIndex = 0;
event.bind(function (eventData){
    //On mouth opens, changes the value of count so update function no longer works
    count ++;
});