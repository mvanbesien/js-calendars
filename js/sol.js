// mvanbesien - v1.0 - 02 Mar 2016

var solCalendarValues = function(date) {

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	var offsets = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	for (var i = 0; i < 13; i++) {
		offsets[i] = 28 * i;
	}

	var nbOfDays = dayCounter(new Date(year, 0, 1), date);

	var sMonth = 1;
	var sYear = year;

	for (var i = 1; i < 13 && nbOfDays >= offsets[i]; i++) {
		sMonth = i + 1;
	}

	var sDay = nbOfDays - offsets[sMonth - 1] + 1;
	
	var refCycle = parseInt((year - 1) / 28);
	var refYear = refCycle * 28 + 1;
	var i = year - refYear;
	var refWeekDay = parseInt(i + i / 4) % 7;
	var sWeekDay = (parseInt(i + i / 4) % 7 + sDay) % 7
	if (sWeekDay <= 0) {
		sWeekDay += 7;
	}
	
	return [sWeekDay, sDay, sMonth, sYear];
};

var solCalendarText = function(date) {
	var MONTHS = ["", "January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December" ];
	var DAYNAMES = [ "", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

	var values = solCalendarValues(date);

	if (values != null) {
		if (values.length == 4) {
			return DAYNAMES[values[0]] + " " + values[1] + " " + MONTHS[values[2]] + " " + values[3];
		}
	}
	return "UNDEFINED";
}
