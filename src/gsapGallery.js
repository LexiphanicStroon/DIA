// Ensure GSAP and its plugins are loaded from the CDN

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// Select elements
let gallery = document.getElementById('gallery');
let scroller = document.getElementById('scroller');

// Create horizontal scroll with ScrollTrigger
let horizontalScroll = ScrollTrigger.create({
  trigger: gallery,
  pin: true,
  anticipatePin: 1,
  scrub: true,
  invalidateOnRefresh: true,
  start: 'top top',
  end: () => scroller.scrollWidth - window.innerWidth,
});

// Calculate drag ratio
let scrollWrapAmount = scroller.offsetWidth;
let panelDistance = scroller.scrollWidth - window.innerWidth;
let dragRatio = (scrollWrapAmount / panelDistance) * 10;

// Create a proxy element for draggable
var proxy = document.createElement('div');

const drag = Draggable.create(proxy, {
  trigger: scroller,
  type: 'x',
  onPress() {
    this.startScroll = horizontalScroll.scroll();
  },
  onDrag() {
    horizontalScroll.scroll(
      this.startScroll - (this.x - this.startX) * dragRatio
    );
  },
});

// Panel scrolling
let panels = gsap.utils.toArray('.image');

panels.forEach((panel, i) => {
  gsap.to(panel, {
    x: () => -scroller.scrollWidth - 100,
    ease: 'none',
    scrollTrigger: {
      trigger: scroller,
      start: 'top top',
      scrub: 1.05,
      invalidateOnRefresh: true,
      end: () => '+=' + scroller.scrollWidth,
    },
  });
});
