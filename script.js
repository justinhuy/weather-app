let weather = {
 apiKey: '45e8bab926fb1c19dbafe8c71c40da70',
 fetchWeather: function (city) {
  fetch(
   'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=metric&appid=' +
    this.apiKey
  )
   .then((response) => response.json())
   .then((data) => this.displayWeather(data));
 },
 displayWeather: function (data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector('.city').innerText = 'Weather in ' + name;
  document.querySelector('.icon').src =
   'https://openweathermap.org/img/wn/' + icon + '@2x.png';
  document.querySelector('.description').innerText = description;
  document.querySelector('.temp').innerText = Math.floor(temp) + '°C';
  document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
  document.querySelector('.wind').innerText = 'Wind speed: ' + speed + ' km/h';

  //   Hide results while loading
  document.querySelector('.weather').classList.remove('loading');

  //   Background image from search
  document.body.style.background =
   "url('https://source.unsplash.com/1600x900/?" + name + "')";
 },

 //  Get value from search bar
 search: function () {
  this.fetchWeather(document.querySelector('.search-bar').value);
 },
};

// Search button listener
document.querySelector('.search button').addEventListener('click', function () {
 weather.search();
});

// Enter key press listener
document
 .querySelector('.search-bar')
 .addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
   weather.search();
  }
 });
