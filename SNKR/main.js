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

window.weatherbitWidgetParams = {
    key: '67478580ac8345e5afbcde0798c1b030',
    autocomplete_container: 'city-form',
    forecast_1: 'forecast-1',
    forecast_2: 'forecast-2',
    forecast_3: 'forecast-3',
    cities_file: 'cities-tropical'
};
(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.weatherbit.io/static/widgets/forecast-series-widget.min.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
})();