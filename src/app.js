document.addEventListener('DOMContentLoaded', () => {
  particlesJS.load('particles-js', 'particles.json', () => console.log('Particles configuration loaded: particles.json'));

  const scrollContainer = document.getElementById('scroll-container');
  let isDown = false, startX, scrollLeft, autoScrollInterval, userInteracted = false;
  const resumeAutoScrollDelay = 200;

  const duplicateContent = () => {
    const originalContent = scrollContainer.innerHTML;
    scrollContainer.innerHTML += originalContent;
  };

  const initializeInfiniteScroll = () => {
    scrollContainer.addEventListener('scroll', () => {
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft -= maxScroll;
      }
    });
  };

  const startAutoScroll = () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      if (!userInteracted) {
        scrollContainer.scrollLeft += 1.5;
      }
    }, 20);
  };

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    userInteracted = true;
    clearInterval(autoScrollInterval);
    scrollContainer.classList.add('cursor-grabbing');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('cursor-grabbing');
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, resumeAutoScrollDelay);
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('cursor-grabbing');
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, resumeAutoScrollDelay);
  });

  scrollContainer.addEventListener('touchstart', () => {
    userInteracted = true;
    clearInterval(autoScrollInterval);
  });

  scrollContainer.addEventListener('touchend', () => {
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, resumeAutoScrollDelay);
  });

  duplicateContent();
  initializeInfiniteScroll();
  startAutoScroll();

  const fab = document.getElementById('fab');
  const menu = document.getElementById('menu');
  const fabIconOpen = document.getElementById('fab-icon-open');
  const fabIconClose = document.getElementById('fab-icon-close');

  fab.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    fabIconOpen.classList.toggle('hidden');
    fabIconClose.classList.toggle('hidden');
  });

  const menuItems = document.querySelectorAll('#menu a');

  menuItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      menuItems.forEach((menuItem) => {
        menuItem.classList.remove('bg-electric-blue');
        menuItem.classList.add('bg-dark-blue');
      });

      this.classList.remove('bg-dark-blue');
      this.classList.add('bg-electric-blue');

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });

      menu.classList.add('hidden');
      fabIconOpen.classList.remove('hidden');
      fabIconClose.classList.add('hidden');
    });
  });
});
