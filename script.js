$(document).ready(function () {
    var now = moment().format("MMMM Do, YYYY");

    $("#currentDay").text(now).append;

    var hour24 = moment().format("H");
    var hour12 = moment().format("h");

    var saveIcon = "./images/save-regular.svg";

    var savedPlans = JSON.parse(localStorage.getItem("savedPlans"));

    if (savedPlans !== null) {
        planText = savedPlans;
    } else {
        planText = new Array(9);
    }

    var plannerDiv = $("#plannerContainer");
    plannerDiv.empty();


    for (var hour = 9; hour <= 17; hour++) {
        var index = hour - 9;

        let rowDiv = $("<div>");
        rowDiv.addClass("row");
        rowDiv.addClass("plannerRow");
        rowDiv.attr("hour-index", hour);

        var column2Div = $("<div>");
        column2Div.addClass("col-md-2");

        var timeBox = $("<span>");
        timeBox.attr("class", "timebox");

        var displayHour = 0;
        var ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        timeBox.text(`${displayHour} ${ampm}`);
        rowDiv.append(column2Div);
        column2Div.append(timeBox);


        var dailyPlan = $("<input>");

        dailyPlan.attr('id', `input-${index}`);
        dailyPlan.attr("hour-index", index);
        dailyPlan.attr("type", "text");
        dailyPlan.attr("class", "dailyplan");

        dailyPlan.val(planText[index]);

        var columnDiv = $("<div>");
        columnDiv.addClass("col-md-9");

        rowDiv.append(columnDiv);
        columnDiv.append(dailyPlan);

        let columnSaveDiv = $("<div>");
        columnSaveDiv.addClass("col-md-1");

        let saveButton = $("<i>");
        saveButton.attr('id', `saveid-${index}`)
        saveButton.attr("save-id", index);
        saveButton.attr("class", "far fa-save saveIcon");

        rowDiv.append(columnSaveDiv);
        columnSaveDiv.append(saveButton);

        updateRowColor(rowDiv, hour);

        plannerDiv.append(rowDiv);

    };

    function updateRowColor(hourRow, hour) {

        if (hour < hour24) {
            hourRow.css("background-color", "darkgrey")
        } else if (hour > hour24) {
            hourRow.css("background-color", "rgb(93, 214, 147)")
        } else {
            hourRow.css("background-color", "rgb(214, 93, 103)")
        }
    };

    $(document).on("click", "i", function(event) {
        event.preventDefault();

        var index = $(this).attr("save-id");

        var inputID = "#input-"+index;
        var value = $(inputID).val();

        planText[index] = value;

        localStorage.setItem("savedPlans", JSON.stringify(planText));

    });

    $(document).on("change", "input", function(event) {
        event.preventDefault();

        let change =$(this).attr("hour-index");
    });

});