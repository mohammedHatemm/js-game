"use strict";

const apiKey = "f70086febe06ff7a9dc443d4ea3d2fd9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        // التحقق من قيمة city
        if (!city || city.trim() === "") {
            document.querySelector(".city").innerHTML = "Please enter the city name";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        // إرسال الطلب
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // التحقق من نجاح الطلب
        if (data.cod !== 200) {
            document.querySelector(".city").innerHTML = `Error: ${data.message}`;
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".temp").innerHTML = "";
            document.querySelector(".humidity").innerHTML = "";
            document.querySelector(".wind").innerHTML = "";
            weatherIcon.src = "";
            return;
        }

        // تحديث واجهة المستخدم
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        // تحديد أيقونة الطقس
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "../asseds/weather-app-img/images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "../asseds/weather-app-img/images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "../asseds/weather-app-img/images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "../asseds/weather-app-img/images/drizzle.png";
                break;
            case "Snow":
                weatherIcon.src = "../asseds/weather-app-img/images/snow.png";
                break;
            case "Thunderstorm":
                weatherIcon.src = "../asseds/weather-app-img/images/thunderstorm.png";
                break;
            case "Mist":
                weatherIcon.src = "../asseds/weather-app-img/images/mist.png";
                break;
            default:
                weatherIcon.src = "";
                break;
        }

        // إظهار بيانات الطقس وإخفاء الخطأ
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "No city with this name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        weatherIcon.src = "";
    }
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    checkWeather(city);
});

// استدعاء افتراضي عند تحميل الصفحة
// checkWeather("Cairo");
