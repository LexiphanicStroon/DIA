/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('callback - particles.js config loaded');
});

  // Preload Images Function
  function preloadImages(urls, allImagesLoadedCallback){
    let count = 0;
    const total = urls.length;

    const checkIfAllImagesAreLoaded = () => {
      count++;
      if(count === total){
        allImagesLoadedCallback();
      }
    };

    urls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = checkIfAllImagesAreLoaded;
      img.onerror = checkIfAllImagesAreLoaded; // Handle errors gracefully
    });
  }

  // List of image URLs to preload
  const imageUrls = [
    "assets/img/insul.jpg",
    "assets/img/backyard.jpg",
    "assets/img/shed.jpg",
    "assets/img/deck2.jpg",
    "assets/img/tiles2.jpg",
    "assets/img/renos2.jpg",
    "assets/img/fence.jpg",
    "assets/img/electric.jpg"
  ];

  // GSAP Warm-up (Performs a trivial animation to ensure GSAP is ready)
  gsap.to({}, {duration: 0.1});

  // After images are preloaded, enable the scroll functionality
  preloadImages(imageUrls, () => {
    console.log('All images are preloaded');
    // Scroll Container Logic
    const scrollContainer = document.getElementById('scroll-container');

    let isDown = false;
    let startX;
    let scrollLeft;

    // Trigger a small scroll on load to warm up browser rendering
    window.addEventListener('load', () => {
      scrollContainer.scrollLeft += 1;
      scrollContainer.scrollLeft -= 1;
    });

    // Mouse down event to start scrolling
    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      gsap.to(scrollContainer, {duration: 0, cursor: 'grabbing'});

      // Force a repaint by manipulating the DOM
      scrollContainer.style.display = 'none';
      scrollContainer.offsetHeight; // forces repaint
      scrollContainer.style.display = 'block';
    });

    // Mouse up event to stop scrolling
    document.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.classList.remove('active');
      gsap.to(scrollContainer, {duration: 0, cursor: 'grab'});
    });

    // Mouse move event for scrolling
    document.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed multiplier

      gsap.to(scrollContainer, {
        scrollLeft: scrollLeft - walk,
        duration: 0.5, // duration of the smooth scroll
        ease: "power3.out" // easing for the smooth scroll
      });
    });

    // Mouse leave event to stop scrolling
    scrollContainer.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        scrollContainer.classList.remove('active');
        gsap.to(scrollContainer, {duration: 0, cursor: 'grab'});
      }
    });
  });
