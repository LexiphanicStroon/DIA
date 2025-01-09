/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
document.addEventListener('DOMContentLoaded', function () {
  particlesJS.load('particles-js', 'particles.json', function () {
    console.log('Particles configuration loaded: ' + 'particles.json');
  });
});
const scrollContainer = document.getElementById('scroll-container');

let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;
let userInteracted = false;

// Function to start auto-scrolling
const startAutoScroll = () => {
  stopAutoScroll(); // Ensure no duplicate intervals
  autoScrollInterval = setInterval(() => {
    if (!userInteracted) {
      scrollContainer.scrollLeft += 1; // Adjust step size for smoothness
    }
  }, 20); // Adjust interval for speed
};

// Function to stop auto-scrolling
const stopAutoScroll = () => {
  clearInterval(autoScrollInterval);
};

// Shorter delay for resuming auto-scroll
const resumeAutoScrollDelay = 200; // 1 second delay

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  userInteracted = true;
  stopAutoScroll(); // Stop auto-scroll while user interacts
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
  stopAutoScroll();
});

scrollContainer.addEventListener('touchend', () => {
  setTimeout(() => {
    userInteracted = false;
    startAutoScroll();
  }, resumeAutoScrollDelay);
});


document.getElementById('fab').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('hidden');
  document.getElementById('fab-icon-open').classList.toggle('hidden');
  document.getElementById('fab-icon-close').classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  // Start Auto-Scroll
  startAutoScroll();

  // Initialize the menu toggle functionality
  const fab = document.getElementById('fab');
  const menu = document.getElementById('menu');
  const fabIconOpen = document.getElementById('fab-icon-open');
  const fabIconClose = document.getElementById('fab-icon-close');

  fab.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    fabIconOpen.classList.toggle('hidden');
    fabIconClose.classList.toggle('hidden');
  });

  // Initialize menu item click behavior
  const menuItems = document.querySelectorAll('#menu a');

  menuItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Update menu item background classes
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove('bg-electric-blue');
        menuItem.classList.add('bg-dark-blue');
      });

      this.classList.remove('bg-dark-blue');
      this.classList.add('bg-electric-blue');

      // Smooth scroll to the target section
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });

      // Hide menu after clicking
      menu.classList.add('hidden');
      fabIconOpen.classList.remove('hidden');
      fabIconClose.classList.add('hidden');
    });
  });
});

