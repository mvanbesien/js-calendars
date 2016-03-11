// mvanbesien - v1.0 - 10 Mar 2016

var meypalCalendarValues = function(date) {	
	
	var days = parseInt(julianDay(date) + 0.5) + 829029 + 1;
	var gEra = parseInt(days / 616894);
	days -= gEra * 616894
	
	var gWeekday = (days - 2) % 7;
	
	var thisYearNbOfDays = 0;
	var gYear = 0;

	
	while (days > thisYearNbOfDays) {
		gYear++;
		days -= thisYearNbOfDays;
		thisYearNbOfDays = 6 * 59;
		if (isLong(gYear)) {
			thisYearNbOfDays += additionalDays(gYear);
		}
	}
	
	var months = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
	if (isLong(gYear)) {
		months[0] = additionalDays(gYear);
	}
	
	var gMonth = 0;
	while (days > months[gMonth]) {
		days -= months[gMonth];
		gMonth++;
	}
	gMonth++;
	var gDay = days;
	return [gDay, gMonth, gYear, gEra];
};

var meypalCalendarText = function(date) {
	var MONTHS = ["", "Aristarchus", "Bruno", "Copernicus", "Dee", "Eratosthenes", "Flamsteed", "Galileo", "Hypatia", "Ibrahim", "Julius", "Khayyam", "Lilius", "Meton"];

	var values = meypalCalendarValues(date);

	if (values != null) {
		if (values.length == 4) {
			return MONTHS[values[1]] + " " + values[0] + ", " + values[2] + " (" + ordinal(values[3])+" Cycle)";
		}
	}
	return "UNDEFINED";
}

var isLong = function(year) {
	var result1 = year % 3 == 0;
	var result2 = sum(year) == 2 || sum(year) == 22 || sum(year) == 23;
	return (result1 || result2) && !(result1 && result2);
}

var sum = function(year) {
	var i = year;
	var sum = 0;
	while (i > 0) {
		sum += i % 10;
		i = parseInt(i / 10);
	}
	return sum;
}

var additionalDays = function(year) {
	if (sum(year) == 2) {
		return 28;
	}
	if (sum(year) == 22) {
		return 29;
	}
	if (sum(year) == 23 || year % 9 == 0) {
		return 30;
	}
	if (year % 3 == 0 && year % 9 != 0) {
		return 31;
	}
	return 29;
}
