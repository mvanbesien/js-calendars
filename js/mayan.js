// mvanbesien - v1.0 - 10 Mar 2016

var mayanTHCalendarText = function(date) {

	var TZOLKINS = [ "Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib",
			"Caban", "Edznab", "Cauac", "Ahau" ];
	var HAABS = [ "Pop", "Uo", "Zip", "Zodz", "Zec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax", "Kayab",
			"Cumku", "Uayeb" ];

	var julianDate = julianDay(date);
	var day = parseInt(julianDay(date) - 584283.5);
	while (day < 0) {
		day += 18980;
	}

	var dayT = day + 160;
	var tzolkin = (dayT % 13 + 1) + " " + TZOLKINS[dayT % 20];
	var dayH = (day + 349) % 365;
	var haab = (dayH % 20) + " " + HAABS[parseInt(dayH / 20)];
	return tzolkin + " " + haab;
}

var mayanLongCalendarText = function(date) {
	var julianDate = julianDay(date);
	var day = parseInt(julianDay(date) - 584282.5);

	var baktun = parseInt(day / 144000);
	day -= baktun * 144000;

	var katun = parseInt(day / 7200);
	day -= katun * 7200;

	var tun = parseInt(day / 360);
	day -= tun * 360;

	var uinal = parseInt(day / 20);
	day -= uinal * 20;

	var kin = parseInt(day);

	var pictun = parseInt(baktun / 13);
	baktun = baktun - 13 * pictun;

	return (pictun > 0 ? pictun + "." : "") + baktun + "." + katun + "." + tun + "." + uinal + "." + kin;

}