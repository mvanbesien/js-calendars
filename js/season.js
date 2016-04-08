// mvanbesien - v1.0 - 08 Apr 2016

var seasonCalendarValues = function(date) {
	var milestones = [];
	var year = date.getFullYear();

	milestones[0] = borealWinterSolstice(year);
	if (dayCounter(milestones[0], date) >= 0) {
		milestones[1] = borealVernalEquinox(year + 1);
		milestones[2] = borealSummerSolstice(year + 1);
		milestones[3] = borealAutumnEquinox(year + 1);
		milestones[4] = borealWinterSolstice(year + 1);
	} else {
		milestones[1] = borealVernalEquinox(year);
		milestones[2] = borealSummerSolstice(year);
		milestones[3] = borealAutumnEquinox(year);
		milestones[4] = borealWinterSolstice(year);
		milestones[0] = borealWinterSolstice(year - 1);
	}

	var quarter = -1;
	for (var i = 0; i < 4 && quarter == -1; i++) {
		if (dayCounter(milestones[i], date) >= 0 && dayCounter(date, milestones[i + 1]) > 0) {
			quarter = i;
		}
	}

	var daysInQuarter = parseInt(dayCounter(milestones[quarter], milestones[quarter + 1]));
	var daysElapsed = parseInt(dayCounter(milestones[quarter], date));

	var seasonDate = [];
	seasonDate[0] = milestones[1].getFullYear();
	seasonDate[1] = quarter;
	if (daysElapsed < 30) {
		seasonDate[2] = 0;
		seasonDate[3] = daysElapsed + 1;
	} else if (daysElapsed < daysInQuarter - 30) {
		seasonDate[2] = 1;
		seasonDate[3] = daysElapsed - 30 + 1;
	} else {
		seasonDate[2] = 2;
		seasonDate[3] = daysElapsed - 30 - (daysInQuarter - 60) + 1;
	}

	return seasonDate;
}

var seasonCalendarText = function(date) {
	var values = seasonCalendarValues(date);
	var quarterMonths = [ " the rising", " high", " the setting" ];
	var quarters = [ "Winter", "Spring", "Summer", "Autumn" ];
	return ordinal(values[3]) + " day of " + quarterMonths[values[2]] + " " + quarters[values[1]] + " of " + values[0];
}

var borealVernalEquinox = function(year) {
	var m = (year - 2000) / 1000;
	var value = 2451623.80984 + 365242.37404 * m + 0.05169 * m * m - 0.00411 * m * m * m - 0.00057 * m * m * m * m;
	var newDate = dateFromJulian(value)
	return new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0, 0);
}

var borealSummerSolstice = function(year) {
	var m = (year - 2000) / 1000;
	var value = 2451716.56767 + 365241.62603 * m + 0.00325 * m * m + 0.00888 * m * m * m - 0.00030 * m * m * m * m;
	var newDate = dateFromJulian(value)
	return new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0, 0);
}

var borealAutumnEquinox = function(year) {
	var m = (year - 2000) / 1000;
	var value = 2451810.21715 + 365242.01767 * m - 0.11575 * m * m + 0.00337 * m * m * m + 0.00078 * m * m * m * m;
	var newDate = dateFromJulian(value)
	return new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0, 0);
}

var borealWinterSolstice = function(year) {
	var m = (year - 2000) / 1000;
	var value = 2451900.05952 + 365242.74049 * m - 0.06223 * m * m - 0.00823 * m * m * m + 0.00032 * m * m * m * m;
	var newDate = dateFromJulian(value)
	return new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0, 0);
}

var dateFromJulian = function(julianDay) {
	var t1 = parseInt(julianDay + 0.5);
	var t2 = parseInt((t1 - 1867216.25) / 36524.25);
	var t3 = parseInt(t2 / 4);
	var t4 = parseInt(t1 + 1 + t2 - t3);
	var t5 = parseInt(t4 + 1524);
	var t6 = parseInt((t5 - 122.1) / 365.25);
	var t7 = parseInt(365.25 * t6);
	var t8 = parseInt((t5 - t7) / 30.6001);
	var t9 = parseInt(30.6001 * t8);

	var dayofmonth = parseInt(t5 - t7 - t9);
	var month = parseInt(t8 - 1);
	if (month > 12)
		month += 12;
	var year = parseInt(t6 - 4715);
	if (month > 2)
		year--;

	var juliantime = julianDay - parseInt(julianDay);
	var hours = parseInt(juliantime * 24);
	juliantime = parseInt((juliantime * 24 - hours) / 24);
	var minutes = parseInt(juliantime * 60 * 24);
	juliantime = parseInt((juliantime * 60 * 24 - minutes) / 60 / 24);
	var seconds = parseInt(juliantime * 60 * 60 * 24);

	return new Date(year, month - 1, dayofmonth, hours, minutes, seconds);
}