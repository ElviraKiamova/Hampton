const linkLanguageElements = document.querySelectorAll('.sidebar__link_language');
const photosSectionElement = document.querySelector('.photos');
const containerElement = document.querySelector('.container');
const timeElement = document.querySelector('.time');


// обновление времени
function updateTime() {
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
  const videoElement = document.querySelector('.video-background');  
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
// containerElement.addEventListener('scroll', () => {
//   if (containerElement.scrollTop > 10) {
//     photosSectionElement.style.display = 'grid';
//   } else {
//     photosSectionElement.style.display = 'none';
//   }
// });