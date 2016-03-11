// mvanbesien - v1.0 - 10 Mar 2016

var darianCalendarValues = function(date) {
	var UNIX_EPOCH = 719527;
	var DAY_RATIO = 1.027491251;
	var DARIAN_EPOCH = 587744.77817;
	
	var elapsedDays = date.getTime() / 86400000 + UNIX_EPOCH;
	var elapsedSols = (elapsedDays - DARIAN_EPOCH) / DAY_RATIO;

	// First decomposition, based on 500yr basis
	var halfMilleniums = parseInt(elapsedSols / 334296);
	var halfMilleniumReminder = parseInt(elapsedSols - halfMilleniums * 334296);

	// Second decomposition, based on 100yr basis
	var centuries = halfMilleniumReminder != 0 ? parseInt((halfMilleniumReminder - 1) / 66859) : 0;
	var centuryReminder = halfMilleniumReminder - (centuries != 0 ? centuries * 66859 + 1 : 0);

	// Third decomposition, based on 10yr basis
	var decadeLeapDayValue = centuries == 0 ? 0 : 1;
	var decades = parseInt((centuryReminder + decadeLeapDayValue) / 6686);
	var decadeReminder = centuryReminder - (decades != 0 ? decades * 6686 - decadeLeapDayValue : 0);

	// Fourth decomposition, based on 2yr basis
	var twoYrsLeapDayValue = centuries != 0 && decades == 0 ? 0 : 1;
	var twoYrsPeriod = parseInt((decadeReminder - twoYrsLeapDayValue) / 1337);
	var twoYrsPeriodReminder = decadeReminder - (twoYrsPeriod != 0 ? twoYrsPeriod * 1337 + twoYrsLeapDayValue : 0);

	// Fifth and last decomposition, based on yearly basis
	var yearLeapDayValue = twoYrsPeriod == 0 && (decades != 0 || (decades == 0 && centuries == 0)) ? 0 : 1;
	var year = parseInt((twoYrsPeriodReminder + yearLeapDayValue) / 669);
	var yearReminder = twoYrsPeriodReminder - (year != 0 ? 669 - yearLeapDayValue : 0);

	// Now, we put all together to compute the date...
	var years = 500 * halfMilleniums + 100 * centuries + 10 * decades + 2 * twoYrsPeriod + year;

	var quarter = yearReminder / 167 < 4 ? parseInt(yearReminder / 167) : 3;
	var solInQuarter = yearReminder - 167 * quarter;
	var monthInQuarter = parseInt(solInQuarter / 28);

	var month = monthInQuarter + 6 * quarter;
	var sol = yearReminder - (month * 28 - quarter) + 1;
	
	return [sol, month, years];
}

var darianCalendarText = function(date) {
	var values = darianCalendarValues(date);
	var MONTHS = ["Sagittarius", "Dhanus", "Capricornus", "Makara", "Aquarius", "Kumbha",
			"Pisces", "Mina", "Aries", "Mesha", "Taurus", "Rishabha", "Gemini", "Mithuna", "Cancer", "Karka", "Leo",
			"Simha", "Virgo", "Kanya", "Libra", "Tula", "Scorpius", "Vrishika"];
	return values[0] + " " +MONTHS[values[1]]+" "+values[2];
}