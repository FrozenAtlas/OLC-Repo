// Made by apoc
// -----JS CODE-----
//@input SceneObject[] onFrontNotBack
//@input SceneObject[] onBackNotFront

var event = script.createEvent("CameraFrontEvent");
event.bind(function (eventData)
{
   for(var i = 0; i<script.onBackNotFront.length; i++){
        script.onBackNotFront[i].enabled = false;
    }
     for(var i = 0; i<script.onFrontNotBack.length; i++){
        script.onFrontNotBack[i].enabled = true;
    }
});

var bevent = script.createEvent("CameraBackEvent");
bevent.bind(function (eventData)
{
     for(var i = 0; i<script.onFrontNotBack.length; i++){
        script.onFrontNotBack[i].enabled = false;
    }
    for(var i = 0; i<script.onBackNotFront.length; i++){
        script.onBackNotFront[i].enabled = true;
    }
});