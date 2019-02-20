//@da.rch#0191
//formats date onto a label in format (20 Februrary 2019)
//@input Component.Label label
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
script.label.text = (formatDate(new Date()).toString());