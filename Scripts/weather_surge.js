var api = "https://api.darksky.net/forecast/9ecf2fe768a55b51af64f9e5305d544d/37.8267,-122.4233";
const lang = "zh"
var lat_lon = "30.22669800041795,120.4073296620461"

//第一行引号内填入申请到的dark sky api
//有问题请通过Telegram反馈 https://t.me/Leped_Bot
//clear-day, partly-cloudy-day, cloudy, clear-night, rain, snow, sleet, wind, fog, or partly-cloudy-night
//☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️💧💦🌫☔️☂️ ☃️⛄️
async function launch() {
    await weather();
    $done();
}

launch()

function weather() {
    let info = {
        url: "https://api.darksky.net/forecast/" + api + "/" + lat_lon + "?lang=" + lang + "&units=si&exclude=currently,minutely",  //?lang=zh&units=si
        headers: {},
    }
    $httpClient.get(info, async function (error, response, data) {
        if (error) {
            console.log(error);
            $notification.post("Dark Sky", lat_lon + '信息获取失败', error);
        } else {
            var obj = JSON.parse(data);
            console.log(obj);
            var hour_summary = obj.hourly.summary;
            var icon_text = obj.hourly.icon;
            var icon = "❓"
            if (icon_text == "clear-day") icon = "☀️";
            if (icon_text == "partly-cloudy-day") icon = "🌤";
            if (icon_text == "cloudy") icon = "☁️";
            if (icon_text == "rain") icon = "🌧";
            if (icon_text == "snow") icon = "☃️";
            if (icon_text == "sleet") icon = "🌨";
            if (icon_text == "wind") icon = "🌬";
            if (icon_text == "fog") icon = "🌫";
            if (icon_text == "partly-cloudy-night") icon = "🌑";
            if (icon_text == "clear-night") icon = "🌑";
            var daily_prec_chance = obj.daily.data[0].precipProbability;
            var daily_maxtemp = obj.daily.data[0].temperatureMax;
            var daily_mintemp = obj.daily.data[0].temperatureMin;
            $notification.post("Dark Sky", icon + " " + daily_mintemp + " - " + daily_maxtemp + "  ☔️% " + Number(daily_prec_chance)*100, hour_summary);
        }
    });
}
