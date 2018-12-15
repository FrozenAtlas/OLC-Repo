//This script allows you to stretch the face dynamically with mouth triggers. 
//When the user opens their mouth, the stretch increases at the speed you specify until it reaches the max amount that you specify (less than 2). 
//When the user closes their mouth, the intensity decreases to 0
// Made by Ben (OLC) Electricsynapse#2395

// -----JS CODE-----	
// @input Component.FaceStretchVisual stretch	
// @input float intensityMax	
// @input float upSpeed	
// @input float downSpeed	
var feature = "Feature0";	
var intensity = 0;	
var stretching = false;	
 var openEvent = script.createEvent("MouthOpenedEvent");	
openEvent.faceIndex = 0;	
openEvent.bind(function (eventData)	
{	
    stretching = true;	
    stretch();	
});	
 var closeEvent = script.createEvent("MouthClosedEvent");	
closeEvent.faceIndex = 0;	
closeEvent.bind(function (eventData)	
{	
    stretching = false;	
    stretch();	
});	
 function stretch()	
{	
 var event1 = script.createEvent("UpdateEvent");	
event1.bind(function (eventData)	
{	
    if (stretching)	
    {	
        if (intensity < script.intensityMax)	
        {	
    intensity += script.upSpeed;	
    script.stretch.setFeatureWeight(feature, intensity);	
        }	
        else	
        {	
            intensity = script.intensityMax;	
            script.stretch.setFeatureWeight(feature, intensity);  	
            event1.enabled = false;	
            return;	
        }	
    }	
    else	
    {	
        if (intensity > 0)	
        {	
    intensity -= script.downSpeed;	
    script.stretch.setFeatureWeight(feature, intensity);	
        }	
        else	
        {	
            intensity = 0;	
            script.stretch.setFeatureWeight(feature, intensity);	
            event1.enabled = false;	
            return;	
        }	
     }	
});	
    	
}	
