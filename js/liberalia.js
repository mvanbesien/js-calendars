// mvanbesien - v1.0 - 05 Mar 2016

var liberaliaCalendarValues = function(date) {
	var days = parseInt(julianDay(date) + 0.5 - 2416557);
	return [ days % 3, liberaliaLunarCalendarValues(days), liberaliaSolarCalendarValues(days) ];
};

var liberaliaLunarCalendarValues = function(days) {
	var allTridays = parseInt(days / 3);
	var cycle = parseInt(allTridays / 45359);
	var tridaysInCycle = allTridays % 45359;

	if (allTridays < 3 * 118) {
		var year = parseInt(tridaysInCycle / 118);
		var tridayInYear = tridayInYear % 118;
		tridayInYear += tridayInYear > 59 ? 1 : 0;
		var month = parseInt(tridayInYear / 10);
		var triday = tridayInYear % 10 + 1;
		return [ triday, month + 1, year, cycle + 1 ];
	} else {
		var newTridayInCycle = allTridays - 3 * 118;
		var innerCycle = parseInt(newTridayInCycle / 945);
		var tridayInInnerCycle = newTridayInCycle % 945;
		var year = parseInt(tridayInInnerCycle / 118) + 8 * innerCycle + 3;
		var tridayInYear = tridayInInnerCycle % 118;
		tridayInYear += tridayInYear > 59 ? 1 : 0;
		var month = parseInt(tridayInYear / 10);
		var triday = tridayInYear % 10 + 1;
		return [ triday, month + 1, year, cycle + 1 ];
	}
}

var liberaliaSolarCalendarValues = function(days) {
	var allTridays = parseInt(days / 3);
	var cycle = parseInt(allTridays / 48212);
	var tridayInCycle = allTridays % 48212;

	var month = -1;
	var triday = -1;
	var year = cycle * 396;
	var tridayIn4Years = -1;

	if (tridayInCycle < 23863) {
		tridayIn4Years = tridayInCycle % 487;
		year += parseInt(tridayInCycle / 487) * 4;
	} else if (tridayInCycle < 23863 + 486) {
		tridayIn4Years = tridayInCycle - 23863;
		year += 196;
	} else {
		var temp = tridayInCycle - 23863 - 486;
		tridayIn4Years = temp % 487;
		year += parseInt(temp / 487) * 4 + 197;
	}

	var tridayInYear = -1;
	if (tridayIn4Years < 122) {
		tridayInYear = tridayIn4Years;
		year += 0;
	} else if (tridayIn4Years <= 122 + 121) {
		tridayInYear = tridayIn4Years - 122;
		year += 1;
	} else if (tridayIn4Years <= 122 + 121 + 122) {
		tridayInYear = tridayIn4Years - 122 - 122;
		year += 2;
	} else {
		tridayInYear = tridayIn4Years - 122 - 122 - 122;
		year += 3;
	}

	if (tridayInYear < 30) {
		triday = tridayInYear;
		month = 0;
	} else if (tridayInYear < 30 + 31) {
		triday = tridayInYear - 30;
		month = 1;
	} else if (tridayInYear < 30 + 31 + 30) {
		triday = tridayInYear - 30 - 31;
		month = 2;
	} else {
		triday = tridayInYear - 30 - 31 - 30;
		month = 3;
	}

	return [ triday + 1, month + 1, year ];
}

var liberaliaCalendarText = function(date) {
	var values = liberaliaCalendarValues(date);
	var DAYS = [ "Sophiesday", "Zoesday", "Norasday" ];
	var SOLAR_MONTHS = [ "Kamaliel", "Gabriel", "Samlo", "Abrasax" ];
	var LUNAR_MONTHS = [ "Armedon", "Nousanios", "Harmozel", "Phaionios", "Ainios", "Oraiel", "Mellephaneus", "Loios", "Davithe", "Mousanios",
			"Amethes", "Eleleth" ];

	return DAYS[values[0]] + ", " + values[1][0] + " " + LUNAR_MONTHS[values[1][1] - 1] + " " + values[1][2] + ", " + values[2][0] + " "
			+ SOLAR_MONTHS[values[2][1] - 1] + " " + values[2][2]
}
