const videoElement = document.querySelector('.video-background');

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