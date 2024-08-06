/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('callback - particles.js config loaded');
});

const scrollContainer = document.getElementById('scroll-container');

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  scrollContainer.classList.add('active');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

document.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.classList.remove('active');
});

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

document.addEventListener(
  'mousemove',
  throttle((e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    scrollContainer.scrollLeft = scrollLeft - walk;
  }, 10) // Adjust the throttle limit as needed
);

document.getElementById('fab').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('hidden');
  document.getElementById('fab-icon-open').classList.toggle('hidden');
  document.getElementById('fab-icon-close').classList.toggle('hidden');
});

// Add smooth scrolling for menu items
document.querySelectorAll('#menu a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
    // Close the menu after clicking
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('fab-icon-open').classList.remove('hidden');
    document.getElementById('fab-icon-close').classList.add('hidden');
  });
});

// Intersection Observer to change menu item color based on the section
const sections = document.querySelectorAll('#home, section');
const fabMenuItems = document.querySelectorAll('#menu a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Reset all menu items to default color
        fabMenuItems.forEach((item) => {
          item.classList.remove('bg-electric-blue');
          item.classList.add('bg-dark-blue');
        });

        // Change the color of the active menu item based on the section in view
        switch (entry.target.id) {
          case 'home':
            document
              .querySelector('#menu a[href="#home"]')
              .classList.remove('bg-dark-blue');
            document
              .querySelector('#menu a[href="#home"]')
              .classList.add('bg-electric-blue');
            break;
          case 'services':
            document
              .querySelector('#menu a[href="#services"]')
              .classList.remove('bg-dark-blue');
            document
              .querySelector('#menu a[href="#services"]')
              .classList.add('bg-electric-blue');
            break;
          case 'about':
            document
              .querySelector('#menu a[href="#about"]')
              .classList.remove('bg-dark-blue');
            document
              .querySelector('#menu a[href="#about"]')
              .classList.add('bg-electric-blue');
            break;
          case 'contact':
            document
              .querySelector('#menu a[href="#contact"]')
              .classList.remove('bg-dark-blue');
            document
              .querySelector('#menu a[href="#contact"]')
              .classList.add('bg-electric-blue');
            break;
        }
      }
    });
  },
  {
    threshold: 0.5, // Adjust the threshold as needed
  }
);

sections.forEach((section) => {
  observer.observe(section);
});