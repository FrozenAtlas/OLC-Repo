// BehaviorScript.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Configure a trigger and response in the inspector UI. No scripting required.
//
// ---- LOCAL API USAGE ----
// Manually trigger this BehaviorScript
//  script.api.trigger();
//
// Add a callback function to call when this BehaviorScript is triggered
//  script.api.addTriggerResponse(callback)
//
// Remove a callback function from this BehaviorScript
//  script.api.removeTriggerResponse(callback)
//
// ---- GLOBAL API USAGE ----
// Manually send a global custom trigger
//  global.scBehaviorSystem.sendCustomTrigger(triggerName)
//
// Add a callback function to call when the global custom trigger named "triggerName" is sent
//  global.scBehaviorSystem.addCustomTriggerResponse(triggerName, callback)
//
// Remove a callback function for the global custom trigger named "triggerName"
//  global.scBehaviorSystem.removeCustomTriggerResponse(triggerName, callback)
// -----------------

//@input string triggeringEventType = "TouchEvent" {"widget": "combobox", "values": [{"value": "TouchEvent", "label": "Touch Event"}, {"value": "FaceEvent", "label": "Face Event"}, {"value": "TurnOnEvent", "label": "Lens Turned On"}, {"value": "UpdateEvent", "label": "Update"}, {"value": "LateUpdateEvent", "label": "Late Update"}, {"value": "CameraFrontEvent", "label": "Front Camera"}, {"value": "CameraBackEvent", "label": "Back Camera"}, {"value": "animationEnd", "label": "Animation End"}, {"value": "tweenEnd", "label": "Tween End"}, {"value": "lookingAt", "label": "Looking At"}, {"value": "distanceCheck", "label": "Distance Check"}, {"value": "onCustomTrigger", "label": "On Custom Trigger"}, {"value": "None", "label": "None"}], "label": "Trigger"}
//@input string touchEventEventType = "TapEvent" {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "values": [{"value": "TapEvent", "label": "Tap"}, {"value": "TouchStartEvent", "label": "Touch Start"}, {"value": "TouchMoveEvent", "label": "Touch Move"}, {"value": "TouchEndEvent", "label": "Touch End"}], "widget": "combobox", "label": "Event Type"}
//@input Component.MeshVisual touchEventTouchTarget {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "label": "Touch Target"}

//@input string faceEventEventType = "MouthOpenedEvent" {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "values": [{"value": "MouthOpenedEvent", "label": "Mouth Opened"}, {"value": "MouthClosedEvent", "label": "Mouth Closed"}, {"value": "BrowsRaisedEvent", "label": "Brows Raised"}, {"value": "BrowsLoweredEvent", "label": "Brows Lowered"}, {"value": "BrowsReturnedToNormalEvent", "label": "Brows Returned to Normal"}, {"value": "FaceFoundEvent", "label": "Face Found"}, {"value": "FaceLostEvent", "label": "Face Lost"}, {"value": "KissStartedEvent", "label": "Kiss Started"}, {"value": "KissFinishedEvent", "label": "Kiss Finished"}, {"value": "SmileStartedEvent", "label": "Smile Started"}, {"value": "SmileFinishedEvent", "label": "Smile Finished"}], "widget": "combobox", "label": "Event Type"}
//@input int faceEventFaceIndex {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "label": "Face Index"}

//@input string animType = "Animated Texture" {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "values": [{"value": "Animated Texture", "label": "Animated Texture"}, {"value": "Sprite Visual", "label": "Sprite Visual"}, {"value": "Animation Mixer", "label": "Animation Mixer"}], "widget": "combobox"}

//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "group_start", "label": "Target"}
//@input Asset.Texture animationEndAnimatedTexture {"showIf": "animType", "showIfValue": "Animated Texture", "label": "Animated Texture"}
//@input Component.SpriteVisual animationEndSpriteVisual {"showIf": "animType", "showIfValue": "Sprite Visual", "label": "Sprite Visual"}
//@input Component.AnimationMixer animationEndAnimMixer {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Mixer"}
//@input string animationEndAnimLayerName {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Layer Name"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "group_end"}

//@input SceneObject tweenEndTargetObject {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Target Object"}
//@input string tweenEndTweenName {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Tween Name"}

//@input SceneObject lookingAtLookingObject {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Looking Object"}
//@input SceneObject lookingAtLookTarget {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Look Target"}
//@input bool lookingAtFlipForwardVec = true {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Flip Forward Vec"}
//@input int lookingAtCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "values": [{"value": -1, "label": "Less Than"}, {"value": 0, "label": "Equal To"}, {"value": 1, "label": "Greater Than"}], "widget": "combobox", "label": "Compare Type"}

//@input float lookingAtAngle = 10.0 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Angle"}
//@input bool lookingAtAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Allow Repeat"}

//@input SceneObject distanceCheckObjectA {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object A"}
//@input SceneObject distanceCheckObjectB {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object B"}
//@input int distanceCheckCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "values": [{"value": -1, "label": "Less Than"}, {"value": 0, "label": "Equal To"}, {"value": 1, "label": "Greater Than"}], "widget": "combobox", "label": "Compare Type"}

//@input float distanceCheckDistance = 1.0 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Distance"}
//@input bool distanceCheckAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Allow Repeat"}

//@input string onCustomTriggerTriggerName {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "label": "Trigger Name"}

//@ui {"widget": "group_start", "label": "Options"}
//@input string triggerLimitType = "Always" {"widget": "combobox", "values": [{"value": "Always", "label": "Always"}, {"value": "Once", "label": "Once"}, {"value": "Interval", "label": "After Interval"}], "label": "Allow"}
//@input float triggerInterval = 1.0 {"showIf": "triggerLimitType", "showIfValue": "Interval", "label": "Interval Time"}
//@input float triggerDelay {"label": "Delay Time"}
//@ui {"widget": "group_end"}
//@ui {"widget": "separator"}
//@input string responseType = "None" {"widget": "combobox", "values": [{"value": "None", "label": "None"}, {"value": "animateSprite", "label": "Animate Sprite"}, {"value": "animateMesh", "label": "Animate Mesh"}, {"value": "playSound", "label": "Play Sound"}, {"value": "setEnabled", "label": "Set Enabled"}, {"value": "setColor", "label": "Set Color"}, {"value": "setTexture", "label": "Set Texture"}, {"value": "runTween", "label": "Run Tween"}, {"value": "setPosition", "label": "Set Position"}, {"value": "setRotation", "label": "Set Rotation"}, {"value": "setScale", "label": "Set Scale"}, {"value": "setBillboardPosition", "label": "Set Billboard Position"}, {"value": "setBillboardRotation", "label": "Set Billboard Rotation"}, {"value": "setBillboardSize", "label": "Set Billboard Size"}, {"value": "printMessage", "label": "Print Message"}, {"value": "sendCustomTrigger", "label": "Send Custom Trigger"}]}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "widget": "group_start", "label": "Target"}
//@input Asset.Texture animateSpriteAnimatedTexture {"showIf": "responseType", "showIfValue": "animateSprite", "label": "Animated Texture"}
//@input Component.SpriteVisual animateSpriteSpriteVisual {"showIf": "responseType", "showIfValue": "animateSprite", "label": "Sprite Visual"}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "widget": "group_end"}
//@input string animateSpriteAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "animateSprite", "values": [{"value": "Play", "label": "Play"}, {"value": "Play or Resume", "label": "Play or Resume"}, {"value": "Pause", "label": "Pause"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@input bool animateSpriteLoop {"showIf": "responseType", "showIfValue": "animateSprite", "label": "Loop"}

//@input Component.AnimationMixer animateMeshAnimationMixer {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Animation Mixer"}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "group_start", "label": "Options"}
//@input string animateMeshLayerName {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Layer Name"}
//@input string animateMeshAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "animateMesh", "values": [{"value": "Play", "label": "Play"}, {"value": "Play or Resume", "label": "Play or Resume"}, {"value": "Pause", "label": "Pause"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@input bool animateMeshLoop {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Loop"}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_start", "label": "Target"}
//@input Asset.AudioTrackAsset playSoundAudioTrack {"showIf": "responseType", "showIfValue": "playSound", "label": "Audio Track"}
//@input Component.AudioComponent playSoundAudioComponent {"showIf": "responseType", "showIfValue": "playSound", "label": "Audio Component"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_end"}
//@input bool playSoundLoop {"showIf": "responseType", "showIfValue": "playSound", "label": "Loop"}
//@input float playSoundVolume = 1.0 {"showIf": "responseType", "widget": "slider", "min": 0.0, "max": 1.0, "step": 0.05, "label": "Volume", "showIfValue": "playSound"}

//@input SceneObject setEnabledTarget {"showIf": "responseType", "showIfValue": "setEnabled", "label": "Target"}
//@input string setEnabledAction = "Enable" {"showIf": "responseType", "showIfValue": "setEnabled", "values": [{"value": "Enable", "label": "Enable"}, {"value": "Disable", "label": "Disable"}, {"value": "Toggle", "label": "Toggle"}], "widget": "combobox", "label": "Action"}

//@ui {"showIf": "responseType", "showIfValue": "setColor", "widget": "group_start", "label": "Target"}
//@input Component.MeshVisual setColorVisual {"showIf": "responseType", "showIfValue": "setColor", "label": "Visual"}
//@input Asset.Material setColorMaterial {"showIf": "responseType", "showIfValue": "setColor", "label": "Material"}
//@ui {"showIf": "responseType", "showIfValue": "setColor", "widget": "group_end"}
//@input vec4 setColorColor = "{1,1,1,1}" {"showIf": "responseType", "showIfValue": "setColor", "widget": "color", "label": "Color"}

//@input Component.MeshVisual setTextureTarget {"showIf": "responseType", "showIfValue": "setTexture", "label": "Target"}
//@input Asset.Texture setTextureNewTexture {"showIf": "responseType", "showIfValue": "setTexture", "label": "New Texture"}

//@input SceneObject runTweenTargetObject {"showIf": "responseType", "showIfValue": "runTween", "label": "Target Object"}
//@input string runTweenTweenName {"showIf": "responseType", "showIfValue": "runTween", "label": "Tween Name"}
//@input string runTweenAction = "Start" {"showIf": "responseType", "showIfValue": "runTween", "values": [{"value": "Start", "label": "Start"}, {"value": "Stop", "label": "Stop"}, {"value": "Pause", "label": "Pause"}, {"value": "Resume", "label": "Resume"}], "widget": "combobox", "label": "Action"}

//@input SceneObject setPositionObjectToMove {"showIf": "responseType", "showIfValue": "setPosition", "label": "Object to Move"}
//@input vec3 setPositionPosition {"showIf": "responseType", "showIfValue": "setPosition", "label": "Position"}
//@input bool setPositionLocalSpace = true {"showIf": "responseType", "showIfValue": "setPosition", "label": "Local Space"}

//@input SceneObject setRotationObjectToRotate {"showIf": "responseType", "showIfValue": "setRotation", "label": "Object to Rotate"}
//@input vec3 setRotationRotationAngle {"showIf": "responseType", "showIfValue": "setRotation", "label": "Euler Rotation"}
//@input bool setRotationLocalSpace = true {"showIf": "responseType", "showIfValue": "setRotation", "label": "Local Space"}

//@input SceneObject setScaleObjectToScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Object to Scale"}
//@input vec3 setScaleScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Scale"}
//@input bool setScaleLocalSpace = true {"showIf": "responseType", "showIfValue": "setScale", "label": "Local Space"}

//@input Component.SpriteAligner setBillboardPositionSpriteAligner {"showIf": "responseType", "showIfValue": "setBillboardPosition", "label": "Sprite Aligner"}
//@input vec2 setBillboardPositionBindingPoint {"showIf": "responseType", "showIfValue": "setBillboardPosition", "label": "Binding Point"}

//@input Component.SpriteAligner setBillboardRotationSpriteAligner {"showIf": "responseType", "showIfValue": "setBillboardRotation", "label": "Sprite Aligner"}
//@input float setBillboardRotationAngle {"showIf": "responseType", "showIfValue": "setBillboardRotation", "label": "Angle"}

//@input Component.SpriteAligner setBillboardSizeSpriteAligner {"showIf": "responseType", "showIfValue": "setBillboardSize", "label": "Sprite Aligner"}
//@input vec2 setBillboardSizeSize {"showIf": "responseType", "showIfValue": "setBillboardSize", "label": "Size"}

//@input string printMessageText {"showIf": "responseType", "showIfValue": "printMessage", "label": "Message"}

//@input string sendCustomTriggerTriggerName {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "label": "Trigger Name"}

if (!global.scBehaviorSystem) {
    global.scBehaviorSystem = {};
    var globalTriggerSystem = (function() {
        var listeners = {};

        function getListeners(key) {
            return setDefault(listeners, key, []);
        }
        return {
            addListener: function(key, callback) {
                getListeners(key).push(callback);
            },
            removeListener: function(key, callback) {
                if (!removeFromArray(getListeners(key), callback)) {
                    debugPrint("Failed to remove listener");
                }
            },
            sendMessage: function(key) {
                getListeners(key).forEach(safeCall);
            },
        };
    })();
    global.scBehaviorSystem.addCustomTriggerResponse = globalTriggerSystem.addListener;
    global.scBehaviorSystem.removeCustomTriggerResponse = globalTriggerSystem.removeListener;
    global.scBehaviorSystem.sendCustomTrigger = globalTriggerSystem.sendMessage;
}
var lastTriggerTime;
var localTriggerResponses = [];

function getSign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function setDefault(obj, key, def) {
    if (!obj.hasOwnProperty(key)) {
        obj[key] = def;
    }
    return obj[key];
}

function removeFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

function debugPrint(message) {
    print("[BehaviorScript] " + message);
}

function safeCall(func) {
    if (func) {
        func();
    }
}

function delayedCallback(delay, callback) {
    var event = script.createEvent("DelayedCallbackEvent");
    event.bind(callback);
    event.reset(delay);
    return event;
}

function safeGetComponent(obj, componentType) {
    return (obj.getComponentCount(componentType) > 0) ? obj.getFirstComponent(componentType) : null;
}

function getOrAddComponent(obj, componentType) {
    return safeGetComponent(obj, componentType) || obj.createComponent(componentType);
}

function createAndBindEvent(eventType, callback) {
    script.createEvent(eventType).bind(callback);
}

function whenValueBecomes(valueFunc, desiredValue, callback, optInitialValue) {
    var lastValue = (optInitialValue === undefined) ? valueFunc() : optInitialValue;
    createAndBindEvent("UpdateEvent", function() {
        var newValue = valueFunc();
        if (newValue === desiredValue && lastValue !== desiredValue) {
            callback();
        }
        lastValue = newValue;
    });
}

function setTranPos(transform, position, useLocal) {
    return useLocal ? transform.setLocalPosition(position) : transform.setWorldPosition(position);
}

function setTranRot(transform, rotation, useLocal) {
    return useLocal ? transform.setLocalRotation(rotation) : transform.setWorldRotation(rotation);
}

function setTranScale(transform, scale, useLocal) {
    return useLocal ? transform.setLocalScale(scale) : transform.setWorldScale(scale);
}

function getFallbackComponent(component, componentType) {
    return component || safeGetComponent(script.getSceneObject(), componentType);
}

function setupTrigger() {
    switch (script.triggeringEventType) {
        case "TouchEvent":
            setupTouchEvent();
            break;
        case "FaceEvent":
            setupFaceEvent();
            break;
        case "TurnOnEvent":
        case "UpdateEvent":
        case "LateUpdateEvent":
        case "CameraFrontEvent":
        case "CameraBackEvent":
            createAndBindEvent(script.triggeringEventType, onTrigger);
            break;
        case "animationEnd":
            setupAnimationEnd();
            break;
        case "tweenEnd":
            setupTweenEnd();
            break;
        case "lookingAt":
            setupLookingAt();
            break;
        case "distanceCheck":
            setupDistanceCheck();
            break;
        case "onCustomTrigger":
            setupOnCustomTrigger();
            break;
    }
}

function doResponse() {
    switch (script.responseType) {
        case "animateSprite":
            triggerAnimateSprite();
            break;
        case "animateMesh":
            triggerAnimateMesh();
            break;
        case "playSound":
            triggerPlaySound();
            break;
        case "setEnabled":
            triggerSetEnabled();
            break;
        case "setColor":
            triggerSetColor();
            break;
        case "setTexture":
            triggerSetTexture();
            break;
        case "runTween":
            triggerRunTween();
            break;
        case "setPosition":
            triggerSetPosition();
            break;
        case "setRotation":
            triggerSetRotation();
            break;
        case "setScale":
            triggerSetScale();
            break;
        case "setBillboardPosition":
            triggerSetBillboardPosition();
            break;
        case "setBillboardRotation":
            triggerSetBillboardRotation();
            break;
        case "setBillboardSize":
            triggerSetBillboardSize();
            break;
        case "printMessage":
            triggerPrintMessage();
            break;
        case "sendCustomTrigger":
            triggerSendCustomTrigger();
            break;
    }
    localTriggerResponses.forEach(safeCall);
}

function onTrigger() {
    var curTime = getTime();
    if (script.triggerLimitType == "Once") {
        if (lastTriggerTime) {
            return;
        }
    } else {
        if (script.triggerLimitType == "Interval") {
            if (curTime < (lastTriggerTime + script.triggerInterval)) {
                return;
            }
        }
    }
    lastTriggerTime = curTime;
    if (script.triggerDelay > 0) {
        delayedCallback(script.triggerDelay, doResponse);
    } else {
        doResponse();
    }
}
setupTrigger();

function setupTouchEvent() {
    var targetScript = script;
    if (script.touchEventTouchTarget) {
        var targetObj = script.touchEventTouchTarget.getSceneObject();
        var touchComponent = getOrAddComponent(targetObj, "Component.TouchComponent");
        touchComponent.addMeshVisual(script.touchEventTouchTarget);
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }
    targetScript.createEvent(script.touchEventEventType).bind(onTrigger);
}

function setupFaceEvent() {
    var faceEvent = script.createEvent(script.faceEventEventType);
    faceEvent.faceIndex = script.faceEventFaceIndex;
    faceEvent.bind(onTrigger);
}

function setupAnimationEnd() {
    switch (script.animType) {
        case "Animated Texture":
            if (!script.animationEndAnimatedTexture) {
                debugPrint("Animated Texture must be set!");
                return;
            }
            script.animationEndAnimatedTexture.control.setOnFinish(onTrigger);
            break;
        case "Sprite Visual":
            if (!script.animationEndSpriteVisual) {
                debugPrint("Sprite Visual must be set!");
                return;
            }
            if (script.animationEndSpriteVisual.mainPass) {
                script.animationEndSpriteVisual.mainPass.baseTex.control.setOnFinish(onTrigger);
            }
            break;
        case "Animation Mixer":
            if (!script.animationEndAnimMixer) {
                debugPrint("Anim Mixer must be set!");
                return;
            }
            if (!script.animationEndAnimLayerName) {
                debugPrint("Anim Layer Name must be set!");
                return;
            }
            var mixerLayer = script.animationEndAnimMixer.getLayer(script.animationEndAnimLayerName);
            if (!mixerLayer) {
                debugPrint("Animation Mixer layer couldn't be found: " + script.animationEndAnimLayerName);
                return;
            }
            whenValueBecomes(function() {
                return mixerLayer.isPlaying();
            }, false, onTrigger);
            break;
    }
}

function setupTweenEnd() {
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    if (!global.tweenManager.isPlaying) {
        debugPrint("global.tweenManager does not contain isPlaying() - is your version up to date?");
        return;
    }
    var isPlaying = function() {
        return global.tweenManager.isPlaying(script.tweenEndTargetObject, script.tweenEndTweenName);
    };
    whenValueBecomes(isPlaying, false, onTrigger, false);
}

function setupLookingAt() {
    if (!script.lookingAtLookingObject) {
        debugPrint("Looking Object must be set!");
        return;
    }
    if (!script.lookingAtLookTarget) {
        debugPrint("Look Target must be set!");
        return;
    }
    var validLastFrame;
    var transA = script.lookingAtLookingObject.getTransform();
    createAndBindEvent("UpdateEvent", function() {
        var posA = script.lookingAtLookingObject.getTransform().getWorldPosition();
        var posB = script.lookingAtLookTarget.getTransform().getWorldPosition();
        var dir = posB.sub(posA).normalize();
        var forward = script.lookingAtFlipForwardVec ? transA.back : transA.forward;
        var angle = forward.angleTo(dir) * 180 / Math.PI;
        if (getSign(angle - script.lookingAtAngle) == script.lookingAtCompareType) {
            if (script.lookingAtAllowRepeat || !validLastFrame) {
                onTrigger();
            }
            validLastFrame = true;
        } else {
            validLastFrame = false;
        }
    });
}

function setupDistanceCheck() {
    var validLastFrame;
    if (!(script.distanceCheckObjectA && script.distanceCheckObjectB)) {
        return;
    }
    createAndBindEvent("UpdateEvent", function() {
        var posA = script.distanceCheckObjectA.getTransform().getWorldPosition();
        var posB = script.distanceCheckObjectB.getTransform().getWorldPosition();
        var distance = posA.distance(posB);
        if (getSign(distance - script.distanceCheckDistance) == script.distanceCheckCompareType) {
            if (script.distanceCheckAllowRepeat || !validLastFrame) {
                onTrigger();
            }
            validLastFrame = true;
        } else {
            validLastFrame = false;
        }
    });
}

function setupOnCustomTrigger() {
    if (!script.onCustomTriggerTriggerName) {
        debugPrint("Trigger Name must be set!");
        return;
    }
    global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerName, onTrigger);
}

function triggerAnimateSprite() {
    if (!(script.animateSpriteAnimatedTexture || script.animateSpriteSpriteVisual)) {
        debugPrint("Sprite Target must be set!");
        return;
    }
    if (script.animateSpriteAnimatedTexture && script.animateSpriteSpriteVisual) {
        script.animateSpriteSpriteVisual.mainPass.baseTex = script.animateSpriteAnimatedTexture;
    }
    var tex = script.animateSpriteAnimatedTexture || script.animateSpriteSpriteVisual.mainPass.baseTex;
    switch (script.animateSpriteAction) {
        case "Play":
            tex.control.play(script.animateSpriteLoop ? -1 : 1, 0);
            break;
        case "Play or Resume":
            if (tex.control.isPlaying()) {
                tex.control.resume();
            } else {
                tex.control.play(script.animateSpriteLoop ? -1 : 1, 0);
            }
            break;
        case "Pause":
            tex.control.pause();
            break;
        case "Stop":
            tex.control.stop();
            break;
    }
}

function triggerAnimateMesh() {
    if (!script.animateMeshAnimationMixer) {
        debugPrint("Animation Mixer must be set!");
        return;
    }
    if (!script.animateMeshLayerName) {
        debugPrint("Layer Name must be set!");
        return;
    }
    var mixerLayer = script.animateMeshAnimationMixer.getLayer(script.animateMeshLayerName);
    switch (script.animateMeshAction) {
        case "Play":
            mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            break;
        case "Play or Resume":
            if (mixerLayer.isPlaying()) {
                mixerLayer.resume();
            } else {
                mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            }
            break;
        case "Pause":
            mixerLayer.pause();
            break;
        case "Stop":
            mixerLayer.stop();
            break;
    }
}

function triggerPlaySound() {
    script.playSoundAudioComponent = script.playSoundAudioComponent || script.getSceneObject().createComponent("Component.AudioComponent");
    if (script.playSoundAudioTrack) {
        script.playSoundAudioComponent.audioTrack = script.playSoundAudioTrack;
    }
    script.playSoundAudioComponent.volume = script.playSoundVolume;
    script.playSoundAudioComponent.play(script.playSoundLoop ? -1 : 1);
}

function triggerSetEnabled() {
    var obj = (script.setEnabledTarget || script.getSceneObject());
    switch (script.setEnabledAction) {
        case "Enable":
            obj.enabled = true;
            break;
        case "Disable":
            obj.enabled = false;
            break;
        case "Toggle":
            obj.enabled = !obj.enabled;
            break;
    }
}

function triggerSetColor() {
    var mat = script.setColorVisual || script.setColorMaterial;
    if (!mat) {
        debugPrint("Color Target must be set!");
        return;
    }
    mat.mainPass.baseColor = script.setColorColor;
}

function triggerSetTexture() {
    if (!script.setTextureTarget) {
        debugPrint("Target must be set!");
        return;
    }
    script.setTextureTarget.mainPass.baseTex = script.setTextureNewTexture;
}

function triggerRunTween() {
    if (!script.runTweenTweenName) {
        debugPrint("Tween Name must be set!");
        return;
    }
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    var obj = (script.runTweenTargetObject || script.getSceneObject());
    switch (script.runTweenAction) {
        case "Start":
            global.tweenManager.startTween(obj, script.runTweenTweenName);
            break;
        case "Stop":
            global.tweenManager.stopTween(obj, script.runTweenTweenName);
            break;
        case "Pause":
            global.tweenManager.pauseTween(obj, script.runTweenTweenName);
            break;
        case "Resume":
            var pauseCheck = global.tweenManager.isPaused;
            if (pauseCheck && pauseCheck(obj, script.runTweenTweenName)) {
                global.tweenManager.resumeTween(obj, script.runTweenTweenName);
            } else {
                var playingCheck = global.tweenManager.isPlaying;
                if (!playingCheck || !playingCheck(obj, script.runTweenTweenName)) {
                    global.tweenManager.startTween(obj, script.runTweenTweenName);
                }
            }
            break;
    }
}

function triggerSetPosition() {
    var tran = (script.setPositionObjectToMove || script).getTransform();
    setTranPos(tran, script.setPositionPosition, script.setPositionLocalSpace);
}

function triggerSetRotation() {
    var tran = (script.setRotationObjectToRotate || script).getTransform();
    setTranRot(tran, quat.fromEulerVec(script.setRotationRotationAngle.uniformScale(Math.PI / 180)), script.setRotationLocalSpace);
}

function triggerSetScale() {
    var tran = (script.setScaleObjectToScale || script).getTransform();
    setTranScale(tran, script.setScaleScale, script.setScaleLocalSpace);
}

function triggerSetBillboardPosition() {
    var aligner = getFallbackComponent(script.setBillboardPositionSpriteAligner, "Component.SpriteAligner");
    if (!aligner) {
        debugPrint("Sprite Aligner must be set!");
        return;
    }
    aligner.bindingPoint = script.setBillboardPositionBindingPoint;
}

function triggerSetBillboardRotation() {
    var tran = (script.setBillboardRotationSpriteAligner || script).getTransform();
    var rot = quat.fromEulerAngles(0, 0, script.setBillboardRotationAngle * Math.PI / 180);
    setTranRot(tran, rot, false);
}

function triggerSetBillboardSize() {
    var aligner = getFallbackComponent(script.setBillboardSizeSpriteAligner, "Component.SpriteAligner");
    if (!aligner) {
        debugPrint("Sprite Aligner must be set!");
        return;
    }
    aligner.size = script.setBillboardSizeSize;
}

function triggerPrintMessage() {
    debugPrint(script.printMessageText);
}

function triggerSendCustomTrigger() {
    if (!script.sendCustomTriggerTriggerName) {
        debugPrint("Trigger Name must be set!");
        return;
    }
    global.scBehaviorSystem.sendCustomTrigger(script.sendCustomTriggerTriggerName);
}
script.api.trigger = onTrigger;
script.api.addTriggerResponse = function(callback) {
    localTriggerResponses.push(callback);
};
script.api.removeTriggerResponse = function(callback) {
    if (!removeFromArray(localTriggerResponses, callback)) {
        debugPrint("Failed to remove response");
    }
};