// mvanbesien - v1.0 - 02 Mar 2016

var symmetry454CalendarValues = function(date) {

	var referenceDay = parseInt(julianDay(date) - 1721424.5);

	var cycle = parseInt(referenceDay / (293 * 365 + 71));
	var day = referenceDay % (293 * 365 + 71);

	var year = 293 * cycle;
	var loop = true;
	while (loop) {
		year++;
		var nbDaysInCurrentYear = (52 * year + 166) % 293 < 52 ? 371 : 364;
		if (day > nbDaysInCurrentYear) {
			day -= nbDaysInCurrentYear;
		} else {
			loop = false;
		}
	}
	
	var month = 1;
	loop = true;
	while (loop && month != 12) {
		var daysInMonth = month % 3 - 2 == 0 ? 35 : 28;
		if (day > daysInMonth) {
			month ++;
			day -= daysInMonth;
		} else {
			loop = false;
		}
	}
	
	var weekday = day % 7;
 
	return [weekday + 1, day, month, year];
};

var symmetry454CalendarText = function(date) {
	var MONTHS = [ "", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
			"December" ];
	var DAYNAMES = [ "", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

	var values = symmetry454CalendarValues(date);

	if (values != null) {
		if (values.length == 4) {
			return DAYNAMES[values[0]] + " " + values[1] + " " + MONTHS[values[2]] + " " + values[3];
		}
	}
	return "UNDEFINED";
}
