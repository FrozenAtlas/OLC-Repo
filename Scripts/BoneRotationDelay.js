// -----JS CODE-----
// @input int frameSkipping = 2
// @input SceneObject boneRotationSource
// @input float smoothing = 1
// @input SceneObject[] bones

print('To use, choose the rotation source (such as a head binding) and the chain of bones you want to follow it');
print('Using a frame skipping of 2 and smoothing of 1 will give a nice delayed effect to the rotation of each bone in the chain');

var rootBone = script.bones[0];

var boneArr = [];
for (var i=1; i<script.bones.length; i++) {
    var boneObj = {
        bone: script.bones[i],
        nextRot: rootBone.getTransform().getWorldRotation()
    }
    boneArr.push(boneObj);
}

function setRotations() {
    for (var i=0; i<boneArr.length; i++) {
        var boneObj = boneArr[i];
        var currentRot = boneObj.bone.getTransform().getWorldRotation();
        var newRot = quat.lerp(currentRot, boneObj.nextRot, script.smoothing);
        boneObj.bone.getTransform().setWorldRotation(newRot);
    }
}

function updateRotations() {
    for (var i=boneArr.length - 1; i>0; i--) {
        boneArr[i].nextRot = boneArr[i-1].nextRot
    }
    boneArr[0].nextRot = rootBone.getTransform().getWorldRotation();
}

var frameIndex = 0;
script.createEvent("UpdateEvent").bind(function() {
    setRotations();
    if (frameIndex % script.frameSkipping === 0) {
        updateRotations();
    } 
    frameIndex += 1;
});
