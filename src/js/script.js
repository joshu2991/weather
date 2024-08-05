document.addEventListener("DOMContentLoaded", () => {
  let latitude = document.getElementById("latitude");
  let longitude = document.getElementById("longitude");

  getUserCurrentLocation();

  let obj = {
        latitude: 49.2819,
        longitude: -123.11874,
        name: "Vancouver"
    };

  weatherRequest(obj);

  main();
});

function main() {
  let autocompleteInput = document.getElementById("autocomplete_input");
  let autocompleteCities = document.getElementById("autocomplete_cities");
  let isSearching = false;

  autocompleteInput.addEventListener("input", () => {
    const city = autocompleteInput.value.trim().toLowerCase();
    autocompleteCities.innerHTML = "";
    if (city.length > 2 && !isSearching) {
      isSearching = true;
      fetchAutocompleteRadarApi(city, 10).then((filteredCities) => {
        console.log(filteredCities);
        if (filteredCities.length === 0) {
          const noResultsDiv = document.createElement("div");
          noResultsDiv.textContent = "No results found";
          //noResultsDiv.classList.add("autocomplete-city");
          autocompleteCities.appendChild(noResultsDiv);
        } else {
          filteredCities.forEach((city) => {
            const div = document.createElement("div");
            div.textContent = city.formattedAddress;
            // div.classList.add("autocomplete-city");
            div.addEventListener("click", () => {
              autocompleteInput.value = city.formattedAddress;
              latitude.value = city.latitude;
              longitude.value = city.longitude;
              autocompleteCities.innerHTML = "";
            });
            autocompleteCities.appendChild(div);
          });
        }
        isSearching = false;
      });
    }
  });

  async function fetchAutocompleteRadarApi(city, limit) {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "prj_test_pk_3d00dceaab6b3dd8142567ff19565bcf79df6489"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `https://api.radar.io/v1/search/autocomplete?query=${city}&limit=${limit}&layers=locality`;

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      return result.addresses.map((address) => address);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}

function getUserCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      },
      (error) => {
        console.error("Error getting location: ", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}    
    
async function weatherRequest (obj){
    let latitude = obj.latitude;
    let longitude = obj.longitude;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        var result = JSON.parse(result);
        let tempH1 = document.getElementById("tempH1");
        tempH1.innerHTML = result.current.temperature_2m + "°C";
        let humidity = document.getElementById("humidity");
        humidity.innerHTML = result.current.relative_humidity_2m + "%";
        let wind = document.getElementById("wind");
        wind.innerHTML = result.current.wind_speed_10m + "Km/h";
        let highTemperature = document.getElementById("high_temperature");
        highTemperature.innerHTML = result.current.
        apparent_temperature + "°C";
        let timeWeather = document.getElementById("time_weather");
        timeWeather.innerHTML = result.current.rain;

        const dates = result.daily.time;
        const days = dates.map(date =>{
            const day = new Date(date).toLocaleDateString("en-US",{weekday: "long"});
            return day;
        });
        
        /* first day after today */
        let minFirstDay = document.getElementById("min_first_day");
        minFirstDay.innerHTML = result.daily.temperature_2m_min[1] + "°C";
        let maxFirstDay = document.getElementById("max_first_day");
        maxFirstDay.innerHTML = result.daily.temperature_2m_max[1] + "°C";

        let firstWeatherImg = document.getElementById("first_weather_img");
        firstWeatherImg.src = getImgAndVideoWheather(result.daily.weather_code[1]);

        let firstDateWeather = document.getElementById("first_date_weather");
        firstDateWeather.innerHTML = days[2];

        /* second day after today */
        let minSecondDay = document.getElementById("min_second_day");
        minSecondDay.innerHTML = result.daily.temperature_2m_min[2] + "°C";
        let maxSecondDay = document.getElementById("max_second_day");
        maxSecondDay.innerHTML = result.daily.temperature_2m_max[2] + "°C";

        let secondWeatherImg = document.getElementById("second_weather_img");
        secondWeatherImg.src = getImgAndVideoWheather(result.daily.weather_code[2]);

        let secondDateWeather = document.getElementById("second_date_weather");
        secondDateWeather.innerHTML = days[3];

        /* third day after today */
        let minThirdDay = document.getElementById("min_third_day");
        minThirdDay.innerHTML = result.daily.temperature_2m_min[3] + "°C";
        let maxThirdDay = document.getElementById("max_third_day");
        maxThirdDay.innerHTML = result.daily.temperature_2m_max[3] + "°C";

        let thirdWeatherImg = document.getElementById("third_weather_img");
        thirdWeatherImg.src = getImgAndVideoWheather(result.daily.weather_code[3]);

        let thirdDateWeather = document.getElementById("third_date_weather");
        thirdDateWeather.innerHTML = days[4];

        /* fourth day after today */
        let minFourthDay = document.getElementById("min_fourth_day");
        minFourthDay.innerHTML = result.daily.temperature_2m_min[4] + "°C";
        let maxFourthDay = document.getElementById("max_fourth_day");
        maxFourthDay.innerHTML = result.daily.temperature_2m_max[4] + "°C";

        let fourthWeatherImg = document.getElementById("fourth_weather_img");
        fourthWeatherImg.src = getImgAndVideoWheather(result.daily.weather_code[4]);

        let fourthDateWeather = document.getElementById("fourth_date_weather");
        fourthDateWeather.innerHTML = days[5];

        /* fifth day after today */
        let minFifthDay = document.getElementById("min_fifth_day");
        minFifthDay.innerHTML = result.daily.temperature_2m_min[5] + "°C";
        let maxFifthDay = document.getElementById("max_fifth_day");
        maxFifthDay.innerHTML = result.daily.temperature_2m_max[5] + "°C";

        let fifthWeatherImg = document.getElementById("fifth_weather_img");
        fifthWeatherImg.src = getImgAndVideoWheather(result.daily.weather_code[5]);

        let fifthDateWeather = document.getElementById("fifth_date_weather");
        fifthDateWeather.innerHTML = days[6];

    })
    .catch((error) => console.error(error));
}

function getImgAndVideoWheather(value){
    switch(value){
        case 0:
            var image = "media/images/sun.png";
            break;
        case 1:
        case 2:
        case 3:
            var image = "media/images/cloudy-day.png";
            break;
        case 45:
        case 48:
            var image = "media/images/mist.png";
            break;
        case 51:
        case 53:
        case 55:
            var image = "media/images/cloudy (3).png";
            break;
        case 56:
        case 57:
            var image = "media/images/cloud.png";
            break;
        case 61:
        case 63:
        case 65:
            var image = "media/images/heavy-rain.png";
            break;
        case 66:
        case 67:
            var image = "media/images/cloud.png";
            break;
        case 71:
        case 73:
        case 75:
            var image = "media/images/snow.png";
            break;
        case 77:
            var image = "media/images/snowflake.png";
            break;
        case 80:
        case 81:
        case 82:
            var image = "media/images/rainy-day.png";
            break;
        case 85:
        case 86:
            var image = "media/images/snowy.png";
            break;
        case 95:
        case 96:
        case 99:
            var image = "media/images/storm.png";
            break;
        default:
            var image = "media/images/sun.png";
            break;
    }

    let finalObj = {
        "image": image
    };
  
    return finalObj.image;
}



