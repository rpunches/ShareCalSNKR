$("button").on("click", function () {

    var sign = $(this).attr("data-sign");

    var queryURL = "https://aztro.herokuapp.com?sign=" + sign + "&day=yesterday";

    $.ajax({
        type: "POST",
        url: queryURL,
        success: function (data) {
            console.log(data);

            var hsDiv = $("<div class='item'>");
            var scope = data.description;
            var p = $("<p>").text("This is your horoscope for " + data.current_date + ": " + scope);
            hsDiv.append(p);
            $("#reading-appear-here").prepend(hsDiv);
        }
    });
});


$("#find-current").on("click", function (event) {
    event.preventDefault();

    var zip = $("#zipcode-input").val();
    var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + zip + "?apikey=zQ3D04GNMqKRvCfeu1qG7MHIx4LNUZ7q";

    $.ajax({
        type: "GET",
        url: queryURL,
    }).then(function (response) {
        console.log(response);

        var wfDiv = $("<div class='item'>");
        var weatherImage = $("<img>");
        weatherImage.attr("src", response.DailyForecasts.Day.Icon[0]);
        var line = response.DailyForecasts.Day.IconPhrase[0];
        var r = $("<p>").text("Today is " + line);
        wfDiv.append(weatherImage)
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