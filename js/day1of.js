const DATE_PARAM = "startDate";
const CONDITION_PARAM = "condition";
const LocalDate = JSJoda.LocalDate;
const ChronoUnit = JSJoda.ChronoUnit;
const today = LocalDate.now();
var startDate;
var condition;

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

	if (startDate.isAfter(today)) {
		return false;
	}

	if (searchParams.has(CONDITION_PARAM)) {
		condition = searchParams.get(CONDITION_PARAM);
	}

	return true;
}

function displayDayOf() {
	let day = startDate.until(today, ChronoUnit.DAYS) + 1;
	$("#today").text(today);
	$("#startDate").text(startDate);
	$("#day").text(day);

	if (condition ) {
		$("#condition").text(condition);
		$("#conditionContainer").show();
	}

	let title = document.title;
	title = title.replace("1", day) + " " + condition;
	document.title = title;


	$("#day1of").show();
}

function displaySelection() {
	$("#selectDate").show();
}
