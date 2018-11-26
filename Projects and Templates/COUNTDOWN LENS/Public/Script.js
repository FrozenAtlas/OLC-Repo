// shoutout to w3schools for saving me some time
//@input Component.Label label
//@input int inputMonth {"label":"Month", "min":1, "max":12, "hint":"Number"}
//@input int inputDay {"label":"Day", "min":1, "max":31, "hint":"Number"}
//@input int inputYear {"label":"Year", "hint":"Number"}
//@input int inputHour {"label":"Hour","min":0, "max":23, "hint":"Number"}
//@input int inputMinute {"label":"Minute", "hint":"Number"}
//@input int inputSecond {"label":"Second", "hint":"Number"}
//@input int inputMillisecond {"label":"Millisecond", "hint":"Number"}

function countdownFinished() {
  // Add your own functions/code here to run when the countdown is over
  // Remove next two lines
  print('countdown done')
  script.label.text = 'Countdown Done'
}

print('=====REMINDER=====')
print('COUNTDOWN SCRIPT USES 24 HOUR TIME FORMAT ON INPUTS')
print('==================')

// year, month [, day, hour, minute, second, millisecond ]
var countDownDate = new Date(
  script.inputYear,
  script.inputMonth - 1,
  script.inputDay,
  script.inputHour,
  script.inputMinute,
  script.inputSecond,
  script.inputMillisecond
)

print('Counting Down To: ' + countDownDate)

// Update the count down every 1 second
var delayedEvent = script.createEvent('DelayedCallbackEvent')
delayedEvent.bind(function(eventData) {
  var now = new Date()

  var distance = countDownDate - now

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)

  script.label.text =
    days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
  if (distance <= 0) {
    print('Time Up')
    countdownFinished()
  } else {
    delayedEvent.reset(1)
  }
})
delayedEvent.reset(0)