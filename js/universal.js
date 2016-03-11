// mvanbesien - v1.0 - 02 Mar 2016

var universalCalendarValues = function(date) {

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	var offsets = [0, 31, 61, 91, 122, 152, 182, 213, 243, 273, 304, 334 ];

	if (isLeapYear(year)) {
		for (var i = 6; i < 12; i++) {
			offsets[i]++;
		}
	}
	
	var nbOfDays = dayCounter(new Date(year, 0, 1), date);

	var uMonth = 1;
	var uYear = year;
	var index = 1;
	while (index < 12 && nbOfDays >= offsets[index]) {
		index++;
		uMonth = index;
	}
	
	var uDay = nbOfDays - offsets[uMonth - 1] + 1;
	if (uDay == 31) {
		if (uMonth == 6) {
			return [1, uYear];
		}
		if (uMonth == 12) {
			return [0, uYear];
		}
	}
	uWeekday = nbOfDays % 7 + 1;
	return [uWeekday, uDay, uMonth, uYear];
};

var universalCalendarText = function(date) {
	var MONTHS = ["", "January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December" ];
	var DAYNAMES = [ "", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	var EXTRADAYS = ["New Year's Day", "Leap Day"]
	var values = universalCalendarValues(date);

	if (values != null) {
		if (values.length == 2) {
			return EXTRADAYS[values[0]]+" "+values[1];
		}
		if (values.length == 4) {
			return DAYNAMES[values[0]] + " " + values[1] + " " + MONTHS[values[2]] + " " + values[3];
		}
	}
	return "UNDEFINED";
}