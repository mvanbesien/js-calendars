// bezien - v0.1 - 20 Mar 2016

var meyenPalmenCalendar = function(date) {
	var elapsedDays = julianDay(date) - 207227;
	var era = parseInt(elapsedDays / 2498258);
	elapsedDays = -era * 2498258;

}