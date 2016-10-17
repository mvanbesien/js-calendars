// mvanbesien - v1.1 - 17 Oct 2016

var sexagesimalCalendarValues = function(date) {

	var year = date.getFullYear();

	var sYear = year - 2012 + 1;
	var nbDays = dayCounter(borealWinterSolstice(year), date);
	if (nbDays < 0) {
		nbDays = dayCounter(borealWinterSolstice(year - 1), date);
		sYear--;
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

var borealWinterSolstice = function(year) {
	var m = (year - 2000) / 1000;
	var value = 2451900.05952 + 365242.74049 * m - 0.06223 * m * m - 0.00823 * m * m * m + 0.00032 * m * m * m * m;
	var newDate = dateFromJulian(value)
	return new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0, 0);
}