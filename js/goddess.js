// mvanbesien - v0.1 - 11 Mar 2016

var goddessCalendarValues = function(date) {

	var cycleLength = 180432;
	var daysFromStart = parseInt(dayCounter(new Date(1901, 7, 14), date));

	var cycleIndex = parseInt(daysFromStart / cycleLength);
	var days = daysFromStart - cycleIndex * cycleLength;

	if (days > 90217) {
		days++;
	}

	var tenYearsCycleLength = 3839;
	var year = 1 + 10 * parseInt(days / tenYearsCycleLength);
	days -= tenYearsCycleLength * parseInt(days / tenYearsCycleLength);

	var normalYearLength = 384;
	year += parseInt(days / normalYearLength);
	days -= normalYearLength * parseInt(days / normalYearLength);

	var twoMonthCycleIndex = 59;
	var month = 1 + 2 * parseInt(days / twoMonthCycleIndex);
	days -= twoMonthCycleIndex * parseInt(days / twoMonthCycleIndex);

	if (days >= 30) {
		days -= 30;
		month++;
	}
	
	return [days + 1, month, year, cycleIndex + 1];
}

var goddessCalendarText = function(date) {
	var values = goddessCalendarValues(date);
	var MONTHS = ["", "Athena", "Brigid", "Cerridwen", "Diana", "Epona", "Freya", "Gaea", "Hathor", "Inanna", "Juno", "Kore", "Lilith", "Maria"];
	return MONTHS[values[1]] + " " +values[0] + ", "+values[2]+" ("+ordinal(values[3])+" Cycle)";
}