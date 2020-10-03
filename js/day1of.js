const DATE_PARAM = "startDate";
const LocalDate = JSJoda.LocalDate;
const currentDate = LocalDate.now();
var startDate;

$(document).ready(function() {
	let valid = parseParams();

	if (valid) {
		displayDayOf();
	} else {
		displaySelection();
	}

});

function parseParams() {
	let searchString = window.location.search;
	let searchParams = new URLSearchParams(searchString);

	if (! searchParams.has(DATE_PARAM)) {
		return false;
	}

	let dateString = searchParams.get(DATE_PARAM)

	try {
		startDate = LocalDate.parse(dateString);
	} catch (e) {
		console.error(e);
		return false;
	}

	if (startDate.isAfter(currentDate)) {
		return false;
	}

	return true;
}

function displayDayOf() {
	$("#startDate").text(startDate);
	$("#startDate").show();
}

function displaySelection() {
	$("#selectDate").show();
}
