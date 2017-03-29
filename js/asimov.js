// mvanbesien - v1.0 - 05 Mar 2017

var asimovCalendarValues = function(date) {
	
	var base = new Date(date.getFullYear(), 11, 21, 0, 0, 0, 0);
	if (date.getTime() < base.getTime()) {
		base.setFullYear(base.getFullYear() - 1);
	}
	var isLeap = isLeapYear(date.getFullYear());
	
	var daysCount = dayCounter(base, date);
	
	var wscLimits = [91, isLeap ? 92 : 91, 91];
	var wscIndex = 0;
	for (var i = 0; i < wscLimits.length && daysCount > wscLimits[i]; i++) {
		wscIndex++;
		daysCount -= wscLimits[i];
	}
	return [wscIndex, daysCount, base.getFullYear() + 1];
}

var asimovCalendarText = function(date) {
	var dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var values = asimovCalendarValues(date);
	return (values[1] < 92 ? (dow[values[1] % 7] + ' '): '') + ['A', 'B', 'C', 'D'][values[0]]+ '-' + (values[1] < 9 ? "0" : "") + (values[1]) +", "+values[2];
}