// mvanbesien - v1.0 - 10 Mar 2016

var aztecSacredCalendarText = function(date) {
	var WEEKDAYS = [ "Cipactli", "Ehecatl", "Calli", "Cuetzpallin", "Coatl", "Miquiztli", "Mazatl", "Tochtli", "Atl", "Itzcuintli", "Ozomatli",
			"Malinalli", "Acatl", "Ocelotl", "Cuauhtli", "Cozcaquautli", "Ollin", "Tecpatl", "Quiauitl", "Xochitl" ];

	var julianDate = parseInt(julianDay(date) - 0.5);
	var origin = 163;
	var aztecDay = julianDate - origin;
	var tonalliDaySign = aztecDay % 20;
	var tonalliDayNumber = aztecDay % 13;
	var trecenasIndex = ((tonalliDaySign + 20) - tonalliDayNumber) % 20;

	return "1-" + WEEKDAYS[trecenasIndex] + " " + (tonalliDayNumber + 1) + "-" + WEEKDAYS[tonalliDaySign];
}

var aztecSolarCalendarText = function(date) {
	var A_SIGNS = [ "Tocltli", "Acatl", "Tecpatl", "Calli" ];
	var A_MONTHS = [ "Atlcahuallo", "Tlacaxipehualitzi", "Tozoztontli", "Huey Tozoztli", "Toxcatl", "Etzalculizti", "Tecuilhuitontli",
			"Huey Tecuilhuitl", "Tlaxochimaco", "Xocotl Huetzi", "Ochpaniztli", "Teotelco", "Tepeilhuitl", "Quecholli", "Panquetzaliztli",
			"Atemozli", "Tititl", "Izcalli", "Nemontemi" ];

	var year = date.getFullYear();
	var dayInYear = dayOfYear(date);

	var dateOffset = 31 + 28 + (isLeapYear(year) ? 1 : 0);
	var aztecDay = dayInYear - dateOffset;
	if (aztecDay < 0) {
		year--;
		aztecDay = aztecDay + 365 + (isLeapYear(year) ? 1 : 0);
	}

	var month = parseInt(aztecDay / 20);
	var dayInMonth = aztecDay % 20;

	var yearOffset = 50;
	var yearNumber = (year - yearOffset) % 13;
	var yearSign = (year - yearOffset) % 4;

	while (yearNumber < 0) {
		yearNumber = yearNumber + 13;
	}
	while (yearSign < 0) {
		yearSign = yearSign + 4;
	}

	return (dayInMonth + 1) + " " + A_MONTHS[month] + " " + (yearNumber + 1) + "-" + A_SIGNS[yearSign];
}