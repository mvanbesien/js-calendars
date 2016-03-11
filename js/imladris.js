// mvanbesien - v1.0 - 26 Feb 2016

var imladrisCalendarValues = function(date) {

	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();

	var yen = year / 144 + 1;
	var loa = year - (yen - 1) * 144;
	if (loa == 0) {
		loa = 144;
		yen--;
	}

	var days = dayCounter(new Date(year, 0, 1, 12, 0, 0, 0), new Date(year, month, day, 12, 0, 0, 0));
	var nbDecalDueToLeapYear = parseInt((year - 1) % 12 / 4);
	var offset = days - 95 - nbDecalDueToLeapYear;

	var nbDaysInImladrisYear = (year - 1) % 12 == 0 ? 368 : 365;

	var gap = nbDaysInImladrisYear - 365;

	if (offset <= 0) {
		offset = offset + nbDaysInImladrisYear;
		loa--;
		if (loa == 0) {
			loa = 144;
			yen = yen - 1;
		}
	}

	if (offset == 1) {
		return [ 0, loa, yen ];
	}

	if (offset > 1 && offset <= 55) {
		var relativeDay = offset - 1;
		return [ relativeDay % 6, relativeDay, 0, loa, yen ];
	}
	if (offset > 55 && offset <= 127) {
		var relativeDay = offset - 55;
		return [ relativeDay % 6, relativeDay, 1, loa, yen ];
	}
	if (offset > 127 && offset <= 181) {
		var relativeDay = offset - 127;
		return [ relativeDay % 6, relativeDay, 2, loa, yen ];
	}
	if (offset > 181 && offset - gap <= 184) {
		var relativeDay = offset - 181;
		if (relativeDay == 1) {
			return [ 1, loa, yen ];
		}
		if (relativeDay == 2) {
			return [ 2, loa, yen ];
		}
		if (relativeDay == 3 && gap > 0) {
			return [ 3, loa, yen ];
		}
		if (relativeDay == 4 && gap > 0) {
			return [ 4, loa, yen ];
		}
		if (relativeDay == 5 && gap > 0) {
			return [ 5, loa, yen ];
		}
		if (relativeDay - gap == 3) {
			return [ 6, loa, yen ];
		}
	}
	if (offset - gap > 184 && offset - gap <= 238) {
		var relativeDay = offset - gap - 184;
		return [ relativeDay % 6, relativeDay, 3, loa, yen ];
	}
	if (offset - gap > 238 && offset - gap <= 310) {
		var relativeDay = offset - gap - 238;
		return [ relativeDay % 6, relativeDay, 4, loa, yen ];
	}
	if (offset - gap > 310 && offset - gap <= 364) {
		var relativeDay = offset - gap - 310;
		return [ relativeDay % 6, relativeDay, 5, loa, yen ];
	}
	if (offset - gap == 365) {
		return [ 7, loa, yen ];
	}
	return [];
};

var imladrisCalendarText = function(date) {
	var EXTRADAYS = [ "Yestarë", "Enna Enderë", "Loëndë", "Cormarë minë", "Cormarë atta", "Cormarë neldë", "Metima Enderë", "Mettarë" ];
	var MONTHS = [ "Tuilië", "Lairë", "Yavië", "Quellë", "Hrivë", "Coirë" ];
	var DAYNAMES = [ "Elenya", "Anarya", "Isilya", "Alduya", "Menelia", "Valanya" ];

	var values = imladrisCalendarValues(date);

	if (values != null) {
		if (values.length == 3) {
			return EXTRADAYS[values[0]] + ", " + ordinal(values[1]) + " Loa, " + ordinal(values[2]) + " Yen of the 7th Age";
		}
		if (values.length == 5) {
			return DAYNAMES[values[0]] + " " + ordinal(values[1]) + " " + MONTHS[values[2]] + ", " + ordinal(values[3]) + " Loa, "
					+ ordinal(values[4]) + " Yen of the 7th Age";
		}
	}
	return "UNDEFINED";
}