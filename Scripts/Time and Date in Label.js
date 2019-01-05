// Based on a script by ApocTheLegend, edited by ARfected
// This script displays the time and date in Label text objects. Just place the script somewhere, input the two Label text objects and you're good to go. Based on Date and Time object by @apoc but now it allows custom fonts, outline, shadow, etc.

//@input Component.Label labelTime
//@input Component.Label labelDate

// Update the time a lot
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData) {
    var date = new Date()
    var month = date.getUTCMonth() + 1
    var day = date.getDate()
    var year = date.getUTCFullYear()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var milliseconds = date.getMilliseconds()

    // Makes sure to always have three digits    
  if (milliseconds < 100) {
        milliseconds = '0' + milliseconds;
    }
    // Makes sure to always have two digits    
  if (seconds < 10) {
        seconds = '0' + seconds;
    }
    // Etc.
  if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
  if (hour < 10) {
        hour = '0' + hour;
    }

  if (day < 100) {
        day = '0' + day;
    }

  if (month < 10) {
        month = '0' + month;
    }

    // Writing to the text Label objects     
    // Seperators : can be anything you want
  script.labelTime.text =
  hour + ':' + minutes + ':' + seconds + ':' +
  milliseconds
    
  script.labelDate.text =
  month + '.' + day + '.' + year
})