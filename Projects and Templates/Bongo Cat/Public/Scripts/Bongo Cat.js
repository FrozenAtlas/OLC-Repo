// -----JS CODE-----
// @input Component.SpriteVisual Up
// @input Component.SpriteVisual Down
// @input Component.SpriteVisual Left
// @input Component.SpriteVisual Right

script.Up.enabled = true;
script.Down.enabled = false;
script.Left.enabled = false;
script.Right.enabled = false;

var event = script.createEvent("TurnOnEvent");
event.bind(function (eventData)
{
    global.touchSystem.touchBlocking = true;
});

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
    if (global.Down)
    {
        script.Up.enabled = false;
        script.Down.enabled = true;
        script.Left.enabled = false;
        script.Right.enabled = false; 
    }
    if (global.Left)
    {
        script.Up.enabled = false;
        script.Down.enabled = false;
        script.Left.enabled = true;
        script.Right.enabled = false; 
    }
    if (global.Right)
    {
        script.Up.enabled = false;
        script.Down.enabled = false;
        script.Left.enabled = false;
        script.Right.enabled = true; 
    } 
    if (global.Right && global.Left)
    {
        script.Up.enabled = false;
        script.Down.enabled = true;
        script.Left.enabled = false;
        script.Right.enabled = false;
    }
    if (!global.Down && !global.Left && !global.Right)
    {
        script.Up.enabled = true;
        script.Down.enabled = false;
        script.Left.enabled = false;
        script.Right.enabled = false; 
    }
});