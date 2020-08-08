// -----JS CODE-----
//@input SceneObject object
// object should be camera, it will work the best

// https://answers.unity.com/questions/29741/mouse-look-script.html

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val
}

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
}

var objTransform = script.object.getTransform()

var mouseSensitivity = 25
var clampAngle = 60

var rotY = 0.0
var rotX = 0.0
var objTransform = script.object.getTransform()
var oldRotation = objTransform.getWorldRotation()

var event = script.createEvent('TouchMoveEvent')
event.bind(function (ev) {
  var touchPos = ev.getTouchPosition()

  var rot = oldRotation.toEulerAngles()
  rotY = rot.y
  rotX = rot.x

  var mouseX = -1 * convertRange(touchPos.x, [0, 1], [-1, 1])
  var mouseY = -1 * convertRange(touchPos.y, [0, 1], [-1, 1])

  rotY += mouseX * mouseSensitivity * getDeltaTime()
  rotX += mouseY * mouseSensitivity * getDeltaTime()

  rotX = clamp(rotX, -clampAngle, clampAngle)

  var newRot = quat.fromEulerAngles(rotX, rotY, 0.0)
  objTransform.setWorldRotation(newRot)
})
