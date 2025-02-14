const videoElement = document.querySelector('.video-background');
const linkLanguageElements = document.querySelectorAll('.sidebar__link_language');

// поведение фона при медленном интернете
document.addEventListener('DOMContentLoaded', () => {    
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