// Needs to be in an initialized Event

// The following script enables touch blocking which allows
// the tapped event to respond to fullscreen touches. It then
// enables touch blocking exceptions which allows Snapchat to
// still respond to certain types of inputs

global.touchSystem.touchBlocking = true;
global.touchSystem.enableTouchBlockingException("TouchTypeDoubleTap", true);
global.touchSystem.enableTouchBlockingException("TouchTypeSwipe", true);