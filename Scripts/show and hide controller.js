// Made by apoc
//  lets you easily show and hide things over time. Lemme know your suggestions, this is still a work in progress

// -----JS CODE-----
//@ui {"widget":"group_start", "label":"Times"}
//@input vec2[] timeSeconds {"label":"Delay in Seconds, Delay to hide in seconds", "min":0.0, "max":1.0, "step":0.001}
//@ui {"widget":"group_end"}[]

//@ui {"widget":"group_start", "label":"Objects"}
//@input SceneObject[] sceneObjs {"label":"Objects in order of times", "min":0.0, "max":1.0, "step":0.001}
//@ui {"widget":"group_end"}[]

print('===== SHOW/HIDE CONTROLLER v0.1 =====')
print(
  'The controller relies on the initial state of your object. If it is enabled by default, it will be hidden then shown again. Vice versa, if its hidden by default it will be shown then hidden again'
)
print('----')
print(
  'The first value is the delay til it is toggled, the second value is how long til it reverts back after being toggled the first time'
)
print('----')
print(
  'Time values and Object Values correpsond, so Value 0 in time controls the object at Value 0 in objects'
)
print('=====================================')

if (script.sceneObjs.length != script.timeSeconds.length)
  return print('Objects & Times lists are not equal')

function setTimeout(callback, time, param1) {
  var delayedEvent = script.createEvent('DelayedCallbackEvent')
  delayedEvent.bind(function(eventData) {
    callback(param1)
  })
  delayedEvent.reset(time / 1000)
}

script.sceneObjs.forEach(function(o, i) {
  setTimeout(function() {
    script.sceneObjs[i].enabled = !script.sceneObjs[i].enabled
    setTimeout(function() {
      script.sceneObjs[i].enabled = !script.sceneObjs[i].enabled
    }, script.timeSeconds[i].y * 1000)
  }, script.timeSeconds[i].x * 1000)
})

/*
To do, add a fade in/out option


*/
