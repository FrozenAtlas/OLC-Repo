// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


//@input bool VisibleOnStart = true
//@input bool SymbolsKey = true
//@input bool OnOffSwitch = true
//@input bool ShiftKey = true
//@input bool ClearKey = true
//@input bool Dark = true
//@input bool ShowPreview = true
//@input bool HideWhenRecording = true
//@input string DefaultText

//@input float scaleX = .08 {"widget":"slider", "min":0.01, "max":0.2, "step":0.001}
//@input float scaleY = .075 {"widget":"slider", "min":0.01, "max":0.2, "step":0.001}
//@input float seperationX = 20.0 {"widget":"slider", "min":0.01, "max":40, "step":0.01}
//@input float seperationY = 2.1 {"widget":"slider", "min":0.01, "max":5.0, "step":0.01}
//@input float fill = 1 {"widget":"slider", "min":0.01, "max":2.0, "step":0.01}
//@input float offset = -2 {"widget":"slider", "min":-10, "max":10.0, "step":0.01}
//@input float spacewidth = 5 {"widget":"slider", "min":0.01, "max":15.0, "step":0.01}

//@input string CharactersToSymbols = "..."
//@input string SymbolsToCharacters = "abc"
//@input string HidePanel = "↓"
//@input string ShowPanel = "↑"
//@input string Shift = "↑"
//@input string Backspace = "←"
//@input string Space = ""
//@input string Clear = "×"

//@input SceneObject Keys

//@input SceneObject PreviewLabel
//@input SceneObject TouchProtect
//@input SceneObject Toggle


global.KeyboardOut = script.DefaultText; // string for output


global.KeyboardVisible              = script.VisibleOnStart;    // check if panel is visible
global.KeyboardSymbolsTab           = false;                    // check if currently in symbols tab
global.KeyboardShiftTab             = false;                    // check if currently in shift/alternative tab
global.KeyboardSpaceWidth           = script.spacewidth         // set space width for Key_Start.js

global.KeyboardHideWhenRecording    = script.HideWhenRecording  // hide when recording


if(!global.KeyboardVisible){
    
    // if invisible by default, hide keyboard at bottom
    script.Keys.getTransform().setLocalPosition(new vec3(0, -100, 0));

    script.PreviewLabel.enabled = false;

}else{

    // if visible by default, make the black background visible as well (if enabled)
    if(script.Dark){

        script.TouchProtect.getFirstComponent("Component.SpriteVisual").getMaterial(0).getPass(0).baseColor = new vec4(0, 0, 0, 0.5);

    }

    // check if preview label should be visible
    if(script.ShowPreview){

        script.PreviewLabel.enabled = true;
    
    }else{

        script.PreviewLabel.enabled = false;

    }

}


global.KeyboardEnableDisable = function(EnableDisable){

    global.ButtonCooldown = true;

    var switchEnabled = script.createEvent("DelayedCallbackEvent");
    switchEnabled.bind(function(eventData)
    {

        var count = script.Keys.getChildrenCount(); // get children

        var i = 0;
        while (i < count){ // for each child

            script.Keys.getChild(i).enabled = EnableDisable; // disable or enable

        i++;

        }

        script.TouchProtect.enabled = EnableDisable; // switch touch protection as well

        global.ButtonCooldown = false;

    });

    switchEnabled.reset(EnableDisable ? 0 : 0.2); // start after a while, if disappearing - immediate start if not

}


global.KeyboardSwitch = function(){ // function to switch visibility for keyboard

    if(global.KeyboardVisible){
        global.tweenManager.startTween(script.Keys, "disappear");

        if(script.Dark){
            global.tweenManager.startTween(script.TouchProtect, "fadeOut");
        }

        script.PreviewLabel.enabled = false;

        global.KeyboardEnableDisable(false);
    }else{
        global.tweenManager.startTween(script.Keys, "appear");

        if(script.Dark){ 
            global.tweenManager.startTween(script.TouchProtect, "fadeIn");
        }

        if(script.ShowPreview){
            script.PreviewLabel.enabled = true;
        }

        global.KeyboardEnableDisable(true);
    }
    global.KeyboardVisible = !global.KeyboardVisible;

}


global.KeyboardResetKeysFunc = function(){ // make this function callable for other scripts

    var i = 0;
    var keyCount = 32;

    while(i < keyCount && i >= 0){ // for 38 keys (alphabet, backspace and OnOffSwitch - symbols and numbers are on the same buttons)
        
        // set placeholder
        NewKey = script.Keys;

        // get the key
        if(i < keyCount - 1){ // keyboard keys
            NewKey = script.Keys.getChild(i < keyCount ? i : keyCount - 1);
        }

        if(i == keyCount - 1){
            NewKey = script.Toggle;
        }


        // create containers for modifying the keys
        var p = new vec2(0, 0);
        var s = new vec2(script.scaleX, script.scaleY);
        var l = 'key text'


        // show or hide keys
        NewKey.enabled = true;
        var disable = false;


        // set initial parameters
        var RowCount = 0;
        var DefaultOffs = .8;
        var sep = new vec2(script.seperationX, script.seperationY);


        var row1 = 10 // first row (qwertyuiop)/(1234567890)
        if(i < row1){

            // h is the horizontal distribution (-1 to 1, so the width of the screen is 2)
            // p is the new position for the key, as a vec2 (x, y) with values in the range -1 to 1 (relative to screen size)
            var h = ((2 + sep.x)/row1) * i - (sep.x/2);
            p = new vec2(h, -script.offset - DefaultOffs);

        }

        var row2 = 9 // second row (asdfghjkl)/(~`!@#$%^&)
        if(i >= row1 && i < (row1 + row2)){

            // row counting starts at 0, so this row (the second one) is row '1'
            RowCount = 1;

            var h = ((2 + sep.x)/row1) * (i - row1 + .5) - (sep.x/2);
            p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

        }

        var row3 = 7 // third row (zxcvbnm)/(*()_-+=)
        if(i >= (row1 + row2) && i < (row1 + row2 + row3)){

            RowCount = 2;

            var h = ((2 + sep.x)/row1) * (i - row1 - row2 + 1.5) - (sep.x/2);
            p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

        }


        RowKeys = row1 + row2 + row3; // key count for all normal keys (26, if no additional rows are added)

        if (i == (RowKeys)){ // symbol switch

            if (script.SymbolsKey){

                global.SymbolsKey = NewKey.name; // storage of special key status on obbject name (to avoid conflicts when keys have the same label)

                RowCount = 3;

                var TopLeftX = script.Keys.getChild(0).getChild(0).getChild(0).getFirstComponent('Component.SpriteAligner').bindingPoint.x;
                var h = TopLeftX;
                p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

            }else{

                NewKey.enabled = false;

            }

        }

        if (i == RowKeys + 1){ // ShiftKey

            if (script.ShiftKey){

                global.ShiftKey = NewKey.name;

                RowCount = 2;

                var TopLeftX = script.Keys.getChild(0).getChild(0).getChild(0).getFirstComponent('Component.SpriteAligner').bindingPoint.x;
                var h = TopLeftX;
                p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);
                
            }else{

                NewKey.enabled = false;

            }

        }

        if (i == RowKeys + 2){ // backspace

            global.Backspace = NewKey.name;

            RowCount = 2;

            var TopRightX = script.Keys.getChild(row2).getChild(0).getChild(0).getFirstComponent('Component.SpriteAligner').bindingPoint.x;
            var h = TopRightX;
            p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

        }

        if (i == RowKeys + 3){ // space

            global.Space = NewKey.name;

            RowCount = 3;

            var h = 0;
            p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

        }

        if (i == RowKeys + 4){ // clear

            if (script.ClearKey){

                global.Clear = NewKey.name;

                RowCount = 3;

                var TopLeftX = script.Keys.getChild(row2 - 1).getChild(0).getChild(0).getFirstComponent('Component.SpriteAligner').bindingPoint.x;
                var h = TopLeftX;
                p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

            }else{

                NewKey.enabled = false;

            }

        }

        if (i == RowKeys + 5){ // hide/show

            if (script.OnOffSwitch){

                global.OnOff = NewKey.name;

                RowCount = 3;

                var TopLeftX = script.Keys.getChild(row2).getChild(0).getChild(0).getFirstComponent('Component.SpriteAligner').bindingPoint.x;
                var h = TopLeftX;
                p = new vec2(h, -(RowCount * sep.y) - script.offset - DefaultOffs);

            }else{

                NewKey.enabled = false;

            }

        }


        // only set position, label, etc when enabled
        if(NewKey.enabled){

            // set key positions
            NewKey.getChild(0).getChild(0).getFirstComponent("Component.SpriteAligner").bindingPoint = p;
            NewKey.getChild(0).getChild(1).getFirstComponent("Component.SpriteAligner").bindingPoint = p;

            // set key scale
            NewKey.getChild(0).getTransform().setLocalScale(new vec3(s.x * script.fill, s.y * script.fill, 1));

            // set key label texts
            var characters      = 'qwertyuiopasdfghjklzxcvbnm';
            var charactersCaps  = 'QWERTYUIOPASDFGHJKLZXCVBNM';
            var symbols         = '1234567890!@#%^_-&|<()+.,>';
            var symbolsCaps     =  '~`?\'\"\\[]{}$€£¥∞-=*/:;°™©•√';


            // set all key labels

            if(i < RowKeys){

                // choose what character set to use
                var ch = '';
                if(global.KeyboardSymbolsTab){
                    if(global.KeyboardShiftTab){
                        ch = symbolsCaps[i]; 
                    }else{
                        ch = symbols[i];
                    }
                }else{
                    if(global.KeyboardShiftTab){
                        ch = charactersCaps[i];
                    }else{
                        ch = characters[i];
                    }
                }

                // set symbols or characters as text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = ch;

            }
            if(i == RowKeys){

                // set symbol key text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = global.KeyboardSymbolsTab ? (script.SymbolsToCharacters) : (script.CharactersToSymbols);

            }
            if(i == RowKeys + 1){
            
                // set Shift text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = script.Shift;
            
            }
            if(i == RowKeys + 2){
            
                // set backspace text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = script.Backspace;
            
            }
            if(i == RowKeys + 3){
            
                // set space text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = script.Space;
            
            }
            if(i == RowKeys + 4){

                // set clear text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = script.Clear;

            }

            if(i == RowKeys + 5){

                // set hide/show text
                NewKey.getChild(0).getChild(1).getFirstComponent("Component.Label").text = global.KeyboardVisible ? script.HidePanel : script.ShowPanel;

                // make accessible to Key_TouchEnded.js
                global.KeyboardOnOffSwitch = NewKey;
                global.KeyboardHidePanelChar = script.HidePanel;
                global.KeyboardShowPanelChar = script.ShowPanel;

            }

        }


        // count new key
        i++;

    }

}

global.KeyboardResetKeysFunc();