// mvanbesien - v1.0 - 26 Feb 2016

var numenorCalendarValues = function(date) {
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();

	var offset = dayCounter(new Date(year, 0, 1), date) + 10;
	var nbOfDaysInYear = isLeapYear(year) ? 366 : 365;
	if (offset > nbOfDaysInYear) {
		offset -= nbOfDaysInYear;
		year++;
	}

	if (offset == 0) {
		return [ 0, year ];
	}
	offset--;

	if (isLeapYear(year)) {
		if (offset == 182) {
			return [ 5, year ];
		}
		if (offset > 182) {
			offset--;
		}
	}

	var dayInPeriod = offset % 91;
	var period = parseInt(offset / 91);
	if (dayInPeriod == 90) {
		return [ period + 1, year ];
	} else {
		return [ offset % 7 + 1, dayInPeriod % 30 + 1, parseInt(period * 3 + dayInPeriod / 30), year ];
	}
}

var numenorCalendarText = function(date) {
	var DAYSNAMES = [ "", "Elenya", "Anarya", "Isilya", "Aldëa", "Menelia", "Eärenya", "Valanya" ];
	var MONTHNAMES = [ "Narvinyë", "Nenimë", "Sulimë", "Viressë", "Lotessë", "Narië", "Cermië", "Urimë", "Yavannië", "Narquelië", "Hisimë", "Ringarë" ];
	var EXTRADAYS = [ "Yestarë", "Tuilerë", "Loëndë", "Yavierë", "Mettarë", "Cormarë" ];
	
	var calendarValues = numenorCalendarValues(date);
	if (calendarValues.length == 2) {
		return EXTRADAYS[calendarValues[0]]+", Loa "+calendarValues[1]+" of the 7th Age";
	}
	if (calendarValues.length == 4) {
		return DAYSNAMES[calendarValues[0]]+" "+ordinal(calendarValues[1])+" "+MONTHNAMES[calendarValues[2]]+", Loa "+calendarValues[3]+" of the 7th Age";
	}
	return "UNDEFINED";
}