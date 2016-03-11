// mvanbesien - v1.0 - 10 Mar 2016

var romanCalendarText = function(date) {
	var RO_MENSIS_1 = [ "Ianuariis", "Februariis", "Martiis", "Aprilibus", "Maiis", "Iuniis", "Iuliis", "Augustis", "Septembribus", "Octobribus",
			"Novembribus", "Decembribus", "Ianuariis" ];
	var RO_MENSIS_2 = [ "Ianuarias", "Februarias", "Martias", "Apriles", "Maias", "Iunias", "Iulias", "Augustas", "Septembres", "Octobres",
			"Novembres", "Decembres", "Ianuarias" ];
	var RO_DIES = [ "", "", "Pridie", "tertium", "quartum", "quintum", "sextum", "septimum", "octavum", "nonum", "decimum", "undecimum",
			"duodecimum", "tertium decimum", "quartum decimum", "quintum decimum", "sextum decimum", "septimum decimum", "duodevicesimum",
			"undevicesimum" ];
	var MONTH_TYPE = [ 1, 4, 3, 2, 3, 2, 3, 1, 2, 3, 2, 1 ];

	var newDate = new Date(date.getTime() - 13 * 86400);

	var rYear = newDate.getFullYear() + 753;
	var date = newDate.getDate();
	var month = newDate.getMonth();
	var monthTypeIndex = MONTH_TYPE[month];
	var leapYear = isLeapYear(newDate.getFullYear());

	var kalendis = 1;
	var nonis = 0;
	var idibus = 0;
	var nextKalendis = 0;
	if (monthTypeIndex == 1) {
		nonis = 5;
		idibus = 13;
		nextKalendis = 32;
	} else if (monthTypeIndex == 2) {
		nonis = 5;
		idibus = 13;
		nextKalendis = 31;
	} else if (monthTypeIndex == 3) {
		nonis = 7;
		idibus = 15;
		nextKalendis = 32;
	} else if (monthTypeIndex == 4) {
		nonis = 5;
		idibus = 13;
		nextKalendis = 29;
	}

	if (leapYear && monthTypeIndex == 4 && date == 25) {
		return "Ante diem bis sextum Kalendas Februarias " + toRomanChars(rYear) + " A.U.C.";
	}
	if (leapYear && monthTypeIndex == 4 && (date > 13 && date < 25)) {
		date--;
	}

	if (date == kalendis) {
		return "Kalendis " + RO_MENSIS_1[month] + " " + toRomanChars(rYear) + " A.U.C."
	}
	if (date == nonis) {
		return "Nonis " + RO_MENSIS_1[month] + " " + toRomanChars(rYear) + " A.U.C."
	}
	if (date == idibus) {
		return "Idibus " + RO_MENSIS_1[month] + " " + toRomanChars(rYear) + " A.U.C."
	}
	if (date == nextKalendis) {
		return "Pridie Kalendis " + RO_MENSIS_1[month] + " " + toRomanChars(month == 11 ? rYear + 1 : rYear) + " A.U.C."
	}

	var mens = RO_MENSIS_2[month];
	var index = 0;
	var zone = "";
	if (date < nonis) {
		index = nonis - date + 1;
		zone = "Nonas";
	} else if (date < idibus) {
		index = idibus - date + 1;
		zone = "Idus";
	} else if (date < nextKalendis) {
		index = nextKalendis - date + 1;
		zone = "Kalendis";
		mens = RO_MENSIS_2[month + 1];
		if (month == 11)
			rYear++;

	}
	var die = index == 2 ? "Pridie" : toRomanChars(index);
	return (index != 2 ? "Ante diem " : "") + die + " " + zone + " " + mens + " " + toRomanChars(rYear) + " A.U.C.";
}