// mvanbesien - v1.0 - 29 Sep 2017

var yermCalendarValues = function(date) {
	
	var day = julianDay(date) - 1948379;
	
	var cycle = 1 + parseInt(day / 25101);
	day = day % 25101;
	
	var yerm = 1 + 3 * parseInt(day / 1447);
	day = day % 1447;
	
	yerm = yerm + parseInt(day / 502);
	day = day % 502;
	
	month = 1 + 2 * parseInt(day / 59);
	day = day % 59;	

	month = month + parseInt(day / 30);
	day = day % 30;
	
	return [cycle, yerm, month, parseInt(day + 1)];
}

var yermCalendarText = function(date) {
	var values = yermCalendarValues(date);
	return (values[0] < 10 ? "0" : "") + values[0] + "-" + (values[1] < 10 ? "0" : "") + values[1] + ")" + (values[2] < 10 ? "0" : "") + values[2] + ")" + (values[3] < 10 ? "0" : "") + values[3];
}