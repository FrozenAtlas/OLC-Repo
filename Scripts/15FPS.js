// Created by Nicholas Dominici
// Last updated on 11/17/2019
// Contact me at imnick43@gmail.com

// INSTRUCTIONS: SETUP ANOTHER RENDER TARGET AND ANOTHER CAMERA ON THAT RENDER TARGET ON A NEW LAYER AND APPLY THAT RENDER TARGET TO A SCREEN IMAGE.

//@input Component.Camera cam


var frameindex = 0

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData){

    frameindex++

    //Applies textureCopy to the sprite
    if (frameindex%2 == 0){
        script.cam.enabled = false;
    }else{
        script.cam.enabled = true;
    }
});
