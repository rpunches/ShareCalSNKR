// CALENDAR JQUERY
$(document).ready(function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2018-03-01',
            },
            {
                title: 'Long Event',
                start: '2018-03-07',
                end: '2018-03-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-03-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-03-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2018-03-11',
                end: '2018-03-13'
            },
            {
                title: 'Meeting',
                start: '2018-03-12T10:30:00',
                end: '2018-03-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2018-03-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2018-03-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2018-03-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2018-03-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2018-03-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2018-03-28'
            }
        ]
    });
    var modal = document.getElementById('calendarModal');
    var span = document.getElementsByClassName("close")[0];
    // Get the modal

    // Get the button that opens the modal
    var btn = document.getElementById("calendarButton");
    // When the user clicks on (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $(document).on("click", ".fc-day", function () {
        ///call modal to come up 
        // $('#calendarModal').modal({

        modal.style.display = "block"
    });

    $("#submit").click(function (event) {

        var newEvent = {
            title: $(".event-name").val,
            start: $(".event-date").val,
            time: $(".event-time").val,
            text: $(".message-text").val

        };
        events.push(newEvent);
        $('#calendar').fullCalendar('updateEvents', events);

        ///clear events 
        ///recall the array of events to the calendar 
    });
});




// $(this).css('border-color', 'red');




//   BUTTON JQUERY
$(".button-container").on("click", function () {

    var sign = $(this).attr("data-sign");

    var queryURL = "https://aztro.herokuapp.com?sign=" + sign + "&day=today";

    $.ajax({
        type: "POST",
        url: queryURL,
        success: function (data) {
            console.log(data);

            var hsDiv = $("<div class='item'>");

            var scope = data.description;
            var color = $("<color>").text("Your lucky color today is " + data.color);
            // var comp = $("<comp>").text("Today, you're compatible with a " + data.compatibility);
            var number = $("<color>").text("Your lucky number is " + data.lucky_number);
            var time = $("<color>").text("Pay attention at " + data.lucky_time + "because that's your lucky time!");
            var mood = $("<color>").text("You're probably feeling " + data.mood + "today.");
            var p = $("<p>").text("This is " + sign + "'s (" + data.date_range + ") " + "horoscope for " + data.current_date + ": " + scope);


            hsDiv.append(p);
            hsDiv.append(p, color, time, number, mood);
            color.append(number, time);
            time.append(mood);
            $("#reading-appear-here").prepend(hsDiv);
        }
    });
});


$("#find-current").on("click", function (event) {
    event.preventDefault();

    // var key = "5961b980628e3194ee5db887acf34602";
    var zip = $("#zipcode-input").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&appid=4a21589577f6e6c281bf65513ad6c951";

    $.ajax({
        type: "GET",
        url: queryURL,
    }).then(function (response) {
        console.log(response);

        var wfDiv = $("<div class='item'>");
        // var weatherImage = $("<img>");
        // weatherImage.attr("src", response.DailyForecasts.Day.Icon[0]);
        var line = response.list[0].weather[0].description;
        var r = $("<p>").text("Weather Forecast: " + line);
        // wfDiv.append(weatherImage)
        wfDiv.append(r)

        $("#forecast-view").prepend(wfDiv);
    });
});




// window.weatherbitWidgetParams = {
//     key: '67478580ac8345e5afbcde0798c1b030',67478580ac8345e5afbcde0798c1b030
//     autocomplete_container: 'city-form',
//     forecast_1: 'forecast-1',
//     forecast_2: 'forecast-2',
//     forecast_3: 'forecast-3',
//     cities_file: 'cities-tropical'
// };
// (function () {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.async = true;
//     script.src = 'https://www.weatherbit.io/static/widgets/forecast-series-widget.min.js';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(script, s);
// })();