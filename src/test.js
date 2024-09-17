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
  scrollContainer.classList.add('cursor-grabbing');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.classList.remove('cursor-grabbing');
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
});

document.getElementById('fab').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('hidden');
  document.getElementById('fab-icon-open').classList.toggle('hidden');
  document.getElementById('fab-icon-close').classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('#menu a');

  menuItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove the active color from all menu items
      menuItems.forEach((item) => {
        item.classList.remove('bg-electric-blue');
        item.classList.add('bg-dark-blue');
      });

      // Add the active color to the clicked menu item
      this.classList.remove('bg-dark-blue');
      this.classList.add('bg-electric-blue');

      // Scroll to the section
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });

      // Close the menu after clicking (for mobile)
      document.getElementById('menu').classList.add('hidden');
      document.getElementById('fab-icon-open').classList.remove('hidden');
      document.getElementById('fab-icon-close').classList.add('hidden');
    });
  });
});
