/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('callback - particles.js config loaded');
});

document
  .querySelector('#scroll-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#services').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
