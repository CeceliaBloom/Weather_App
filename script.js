       //Selecting forms/buttons var info
const formGroup=document.getElementById("locationForm");
const locationInput= document.getElementById("locationInput");
const sumbmitBtn=document.getElementById("getWeatherBtn");
const saveHomeBtn=document.getElementById("saveHomeBtn");
const savedHome= document.getElementById("savedHomeInfo");
const saveAreaBtn=document.getElementById("saveAreaBtn");
const savedAreas=document.getElementById("savedAreas");
const weatherInfo = document.getElementById("weatherInfo");
      
      //API var info 
const apiKey= "883bab74f414e678b3a92b03276074d3";
let cityname = "";
/*let weatherAppUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}`;*/

const lat = "";
const lon = "";


      // Fetch weather data from the API
async function getWeatherData() {
let weatherAppUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial`;
const url = `${weatherAppUrl}&appid=${apiKey}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
  }
}

async function latLong(){
  const latLongUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  try {
    const latLongResponse = await fetch(latLongUrl);
    const latLongData = await latLongResponse.json();
    return latLongData;
} catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
}
}

      //Process JSON data and return required information
function processWeatherData(data) {
  return {
    temperature: Math.trunc(data.main.temp),
    H: Math.trunc(data.main.temp_max),
    L: Math.trunc(data.main.temp_min)      
  };
}

    //Display weather information on the webpage
function displayWeatherInfo(info) {
  weatherInfo.innerHTML = `
      <h2>Weather Information</h2>
      <p>Temperature: ${info.temperature}°F</p>
     <div id="tempsContain">
      <div id="hTempContain">H: ${info.H}</div>
      <div id="lTempContain">L: ${info.L}</div>
      </div>`;
}

      //Event listener for form submission
formGroup.addEventListener("submit", async function (event) {  
  event.preventDefault(); 
  cityname = locationInput.value;
  const weatherData = await getWeatherData();
  console.log(weatherData);
  const temp =  processWeatherData(weatherData);
  displayWeatherInfo(temp);
 
});
// Event listener for form submission
formGroup.addEventListener("submit", async function (event) {
  event.preventDefault();
  cityname = locationInput.value;
  const weatherData = await getWeatherData();
  const temp = processWeatherData(weatherData);
  displayWeatherInfo(temp);
});

// Event listener for Save Home button
saveHomeBtn.addEventListener("click", function () {
  const listSave = document.createElement("li");
  listSave.textContent = cityname;
  savedHome.appendChild(listSave);
});


// Event listener for Save Area button
saveAreaBtn.addEventListener("click", function () {
  const listItem = document.createElement("li");
  listItem.textContent = cityname;
  savedAreas.appendChild(listItem);
});











