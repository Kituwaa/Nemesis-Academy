const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.track');
let slides = Array.from(track.children);

// klonowanie dla efektu loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);
const slideWidth = slides[0].offsetWidth;
let currentIndex = 1; // start od pierwszego oryginalnego slide

// ustawienie początkowego położenia (aktywny slide na środku)
function centerSlide(index) {
  slides.forEach(sl => sl.classList.remove('active'));
  slides[index].classList.add('active');

  const offset = slides[index].offsetLeft - (carousel.offsetWidth/2 - slideWidth/2);
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${offset}px)`;
}

// inicjalizacja
centerSlide(currentIndex);

// przyciski
carousel.querySelector('.next').addEventListener('click', () => {
  currentIndex++;
  centerSlide(currentIndex);
});

carousel.querySelector('.prev').addEventListener('click', () => {
  currentIndex--;
  centerSlide(currentIndex);
});

// loop po zakończeniu transition
track.addEventListener('transitionend', () => {
  if (slides[currentIndex] === firstClone) {
    track.style.transition = 'none';
    currentIndex = 1;
    const offset = slides[currentIndex].offsetLeft - (carousel.offsetWidth/2 - slideWidth/2);
    track.style.transform = `translateX(-${offset}px)`;
    slides.forEach(sl => sl.classList.remove('active'));
    slides[currentIndex].classList.add('active');
  }
  if (slides[currentIndex] === lastClone) {
    track.style.transition = 'none';
    currentIndex = slides.length - 2;
    const offset = slides[currentIndex].offsetLeft - (carousel.offsetWidth/2 - slideWidth/2);
    track.style.transform = `translateX(-${offset}px)`;
    slides.forEach(sl => sl.classList.remove('active'));
    slides[currentIndex].classList.add('active');
  }
});
