async function changecity() {
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=d53d4599411de724ea6e27a3661c59c9&units=metric";
  const d = document.getElementById("search").value;
  const response = await fetch(url + "&q=" + d);
  const data = await response.json();
  if (data.cod == '404') {
    alert("Invalid City Name !");
    document.getElementById("search").value = "";
    return;
  }
  else{
    document.getElementById("city").innerText = d.charAt(0).toUpperCase() + d.slice(1);
    checkweather();
  }
}
async function checkweather() {
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=d53d4599411de724ea6e27a3661c59c9&units=metric";
  const city = document.getElementById("city").innerText;
  const response = await fetch(url + "&q=" + city);
  const data = await response.json();
  console.log(data);
  const temp = document.getElementById("degree");
  temp.innerText = data.main.temp.toFixed(0).slice(0, 2) + "°C";
  const cond = document.getElementById("cond");
  cond.innerText = data.weather[0].main;
  const feels = document.getElementById("feels");
  feels.innerText = "feels like " + data.main.feels_like.toFixed(0).slice(0, 2) + "°C";
  const cont = document.getElementById("cont");
  cont.innerText = " , " + data.sys.country;
  const humidity = document.getElementById("humidity");
  humidity.innerText = "Humidity " + data.main.humidity + "%";
  const air = document.getElementById("air");
  air.innerText = "Pressure " + data.main.pressure + "mbar";
  const precipitation = document.getElementById("precipitation");
  precipitation.innerText = "Clouds " + data.clouds.all + "%";

  var src;
  if (cond.innerText === "Clouds") {
    src = "images/clouds.png";
  } else if (cond.innerText === "Clear") {
    src = "images/clear.png";
  } else if (cond.innerText === "Rain") {
    src = "images/rain.png";
  } else if (cond.innerText === "Haze") {
    src = "images/haze.png";
  } else if (cond.innerText === "Drizzle") {
    src = "images/drizzle.png";
  } else if (cond.innerText === "Mist") {
    src = "images/mist.png";
  } else {
    src = "images/2682827_cloud_day_light bolt_rain_sun_icon.png";
  }
  document.getElementById("sky").src = src;

  const sr = document.getElementById("sr");
  const ss = document.getElementById("ss");

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12).toString().padStart(2, '0');

    return `${formattedHours}:${minutes} ${ampm}`;
  };

  sr.innerText = formatTime(new Date(data.sys.sunrise * 1000));
  ss.innerText = formatTime(new Date(data.sys.sunset * 1000));


  const max = data.main.temp_max;
  const min = data.main.temp_min;
  const maxtemp = document.getElementById("maxtemp");
  const mintemp = document.getElementById("mintemp");
  maxtemp.innerText = max.toFixed(0).slice(0, 2) + "°C";
  mintemp.innerText = min.toFixed(0).slice(0, 2) + "°C";
}
