// mvanbesien - v1.0 - 27 Feb 2016

var sexagesimalCalendarValues = function(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	var sYear = year - 2012;
	var nbDays = dayCounter(new Date(year - 1, 11, 21), date);
	var nbOfDaysInYear = isLeapYear(year) ? 366 : 365;
	if (nbDays > nbOfDaysInYear) {
		nbDays -= nbOfDaysInYear;
		sYear++;
	}

	var dayNb = nbDays % 61 + 1;
	var soixNb = parseInt(nbDays / 61) + 1;
	
	var weekdayNb = dayNb == 61 ? 0 : (dayNb - 1) % 6 + 1;
	if (dayNb != 61) {
		return [weekdayNb, dayNb, soixNb, sYear];
	} else {
		return [soixNb, sYear];
	}
}

var sexagesimalCalendarText = function(date) {
	var DAYSNAMES = [ "", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" ]
	var SOIX = [ "", "Frigée", "Eclose", "Florée", "Granée", "Récole", "Caduce" ];
	var ADVENTICE = ["", "Bacchanal", "Cérès", "Musica", "Liber", "Memento Mori", "Sext"];
	
	var calendarValues = sexagesimalCalendarValues(date);
	if (calendarValues.length == 2) {
		return ADVENTICE[calendarValues[0]]+" "+ trailingZeros(calendarValues[1] > 0 ? calendarValues[1] : calendarValues[1] - 1, 3);
	}
	if (calendarValues.length == 4) {
		return DAYSNAMES[calendarValues[0]]+" "+calendarValues[1]+(calendarValues[1] == 1 ? "er" : "")+" "+SOIX[calendarValues[2]]+" "+trailingZeros(calendarValues[1] > 0 ? calendarValues[3] : calendarValues[3] - 3,3);
	}
	return "UNDEFINED";
}

var trailingZeros = function(value, size) {
	var string = "" + value;
	while (string.length < size) {
		string = "0" + string;
	}
	return string;
}