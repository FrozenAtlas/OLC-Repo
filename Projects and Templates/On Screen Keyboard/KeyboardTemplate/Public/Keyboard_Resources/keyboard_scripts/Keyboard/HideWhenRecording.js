// Max van Leeuwen - maxvanleeuwen.com
// snap, insta, twitter @ maxeflats


if(global.scene.isRecording()){
	if(global.KeyboardHideWhenRecording){
		script.getSceneObject().enabled = false;
	}
}else{
	script.getSceneObject().enabled = true;
}