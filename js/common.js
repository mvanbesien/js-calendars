// mvanbesien - v1.0 - 05 Mar 2016

var dayCounter = function(beginDate, endDate) {
	var beginDoy = dayOfYear(beginDate);
	var endDoy = dayOfYear(endDate);
	var gap = 0;

	if (endDate.getFullYear() > beginDate.getFullYear()) {
		gap = gap + (isLeapYear(beginDate.getFullYear()) ? 366 : 365) - beginDoy;
	} else {
		gap = gap - beginDoy;
	}

	var tempYear = beginDate.getFullYear();
	while (tempYear + 1 < endDate.getFullYear()) {
		gap = gap + (isLeapYear(tempYear) ? 366 : 365);
		tempYear = tempYear + 1;
	}

	return gap + endDoy;
};

var isLeapYear = function(year) {
	return year % 400 == 0 || year % 4 == 0 && year % 100 != 0;
};

var dayOfYear = function(date) {
	var dayCount = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];
	var mn = date.getMonth();
	var dn = date.getDate();
	var dayOfYear = dayCount[mn] + dn;
	if (mn > 1 && isLeapYear(date.getFullYear())) {
		dayOfYear++;
	}
	return dayOfYear;
}

var ordinal = function(value) {
	if (value % 10 == 1 && parseInt(value % 100 / 10) != 1) {
		return value + "st";
	}
	if (value % 10 == 2 && parseInt(value % 100 / 10) != 1) {
		return value + "nd";
	}
	if (value % 10 == 3 && parseInt(value % 100 / 10) != 1) {
		return value + "rd";
	}
	return value + "th";
}

var julianDay = function(date) {
	return parseInt(date.getTime() / 86400000) + 2440587.5
}

var toRomanChars = function(value) {
	var result = "";
	var isNeg = false;
	if (value < 0) {
		value = -value;
		isNeg = true;
	}
	result = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ][value % 10] + result;
	value = parseInt(value / 10);
	result = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ][value % 10] + result;
	value = parseInt(value / 10);
	result = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ][value % 10] + result;
	value = parseInt(value / 10);
	result = [ "", "M", "MM", "MMM", "MMMM", "MMMMM", "?", "?", "?", "?" ][value % 10] + result;

	return result;
}