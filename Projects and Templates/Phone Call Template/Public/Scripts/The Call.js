// -----JS CODE-----
// @input Asset.Texture TheCall
// @input float VideoLength

// @ui {"widget":"group_start", "label":"Advanced"}
// @input Component.Label username
// @input Component.SpriteVisual profile
// @input SceneObject tween
// @input Component.AudioComponent ringtone
// @input Component.SpriteVisual background
// @input Component.SpriteVisual declineText
// @input Component.SpriteVisual declineButton
// @input Component.SpriteVisual answerText
// @input Component.SpriteVisual answerButton
// @ui {"widget":"group_end"}

count = 0;
script.background.enabled = false;
script.declineButton.enabled = false;
script.declineText.enabled = false;
script.answerButton.enabled = false;
script.answerText.enabled = false;
script.profile.enabled = false;
script.username.enabled = false;

var event = script.createEvent("TurnOnEvent");
event.bind(function (eventData)
{
    global.touchSystem.touchBlocking = true;
});

function onTapped(eventData)
{
    count++;
    if (count == 0)
    {
        if (script.ringtone.isPlaying())
        {
            script.ringtone.stop(true);
            script.background.enabled = false;
            script.declineButton.enabled = false;
            script.declineText.enabled = false;
            script.answerButton.enabled = false;
            script.answerText.enabled = false;
            script.profile.enabled = false;
            script.username.enabled = false;
        }
        
    }
    
    if (count == 1)
    {
       script.ringtone.play(-1);
       script.background.enabled = true;
       script.declineButton.enabled = true;
       script.declineText.enabled = true;
       script.answerButton.enabled = true;
       script.answerText.enabled = true;
       script.profile.enabled = true;
       script.username.enabled = true; 
    }

    if (count == 2)
    {   
       script.background.enabled = false;
       script.declineButton.enabled = false;
       script.declineText.enabled = false;
       script.answerButton.enabled = false;
       script.answerText.enabled = false;
       script.profile.enabled = false;
       script.username.enabled = false;
       global.tweenManager.startTween( script.tween, "moveCam" );
       global.tweenManager.startTween( script.tween, "scaleCam" );
       var provider = script.TheCall.control;
       provider.play(1);
       script.ringtone.stop(true);
        
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(function(eventData)
{
        global.tweenManager.startTween( script.tween, "moveCamBack" );
        global.tweenManager.startTween( script.tween, "scaleCamBack" );
        global.answer = false;
        global.decline = false;
        global.count = 0;
});
delayedEvent.reset(script.VideoLength);
              
    }
    
  }

var event = script.createEvent("TapEvent");
event.bind(onTapped);
