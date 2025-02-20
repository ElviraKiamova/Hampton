const UPDATE_EVERY_HOUR = 3600000;
const YOUR_CITY = 'Volgograd,ru';
const API_KEY = '2316a73e1e0350e6fce6d81077c4e27b';
const linkLanguageElements = document.querySelectorAll('.sidebar__link_language');
const photosSectionElement = document.querySelector('.photos');
const containerElement = document.querySelector('.container');
const timeElement = document.querySelector('.time');
const weatherElement = document.querySelector('.weather');
const videoSectionElement = document.querySelector('.video');


// отображение погоды
const fetchWeather = () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${YOUR_CITY}&units=metric&appid=${API_KEY}&lang=ru`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp.toFixed(0);
      weatherElement.textContent = `${temperature}`;
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}
fetchWeather();
setInterval(fetchWeather, UPDATE_EVERY_HOUR);


// обновление времени
const updateTime = () => {
  const dateHours = new Date().getUTCHours();
  const dateMinutes = new Date().getUTCMinutes();
  const volgHours = (dateHours + 3) % 24;
  const hours = volgHours.toString().padStart(2, '0');
  const minutes = dateMinutes.toString().padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime();


// поведение фона при медленном интернете
document.addEventListener('DOMContentLoaded', () => {  
  const videoElement = document.querySelector('.video__background');  
  if (navigator.connection) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection.effectiveType;
    
    if (effectiveType === '4g') {
      videoElement.play().catch(error => {
        console.warn('Видео остановлено:', error);
      });
    } else {
      videoElement.poster = "../images/main.jpg";
      videoElement.load();
    }
  } else {
    videoElement.play().catch(error => {
      console.warn('Видео заблокировано:', error);
    });
  }
});


// переключение языка сайта
linkLanguageElements.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    linkLanguageElements.forEach(item => item.classList.remove('sidebar__link_active'));
    link.classList.add('sidebar__link_active');
  });
});


// прокрутка главной страницы
 function onUpdateStyles() {
    if (window.innerWidth >= 1000) {
      if (window.innerHeight > videoSectionElement.clientHeight) {
        photosSectionElement.style.opacity = '1';
        photosSectionElement.style.visibility = 'visible';
      } else {
        containerElement.addEventListener('scroll', () => {
        if (containerElement.scrollTop > 10) {
          photosSectionElement.style.opacity = '1';
          photosSectionElement.style.visibility = 'visible';
        }
      });
    }
    } else {
      photosSectionElement.style.opacity = '1';
      photosSectionElement.style.visibility = 'visible';
    }
}
window.addEventListener('resize', onUpdateStyles);
onUpdateStyles();