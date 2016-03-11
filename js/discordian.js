// mvanbesien - v1.0 - 05 Mar 2016

var discordianCalendarValues = function(date) {
	var days = dayOfYear(date) - 1;
	var year = date.getFullYear() + 1166;

	if (isLeapYear(date.getFullYear())) {
		if (days == 60) {
			return [ 0, year ];
		} else if (days > 60) {
			days--;
		}
	}
	return [ days % 5, days % 73 + 1, parseInt(days / 73), year ];
}

var discordianCalendarText = function(date) {
	var values = discordianCalendarValues(date);
	var WEEKDAYS = [ "Sweetmorn", "Boomtime", "Pungenday", "Prickle-Prickle", "Setting Orange" ];
	var MONTHS = [ "Chaos", "Discord", "Confusion", "Bureaucracy", "The Aftermath" ];
	var EXTRA = [ "St Tib's Day" ];

	if (values.length == 2) {
		return EXTRA[values[0]] + ", " + values[1] + " YOLD";
	} else if (values.length == 4) {
		return WEEKDAYS[values[0]] + ", " + MONTHS[values[2]] + " " + values[1] + ", " + values[3] + " YOLD";
	}
	return "";
}