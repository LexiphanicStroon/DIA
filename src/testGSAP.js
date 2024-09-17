document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(Draggable);

  const scrollContainer = document.getElementById('scroll-container');

  if (!scrollContainer) {
    console.error("'#scroll-container' not found in DOM");
    return;
  }

  Draggable.create(scrollContainer, {
    type: 'x', // Horizontal dragging
    bounds: scrollContainer, // Keeps the drag action within the container bounds
    edgeResistance: 0.5, // Makes it resistant at the edges
    inertia: true, // Adds smooth inertia for continued scrolling after release
    dragClickables: true, // Allows clicking inside the draggable area
    lockAxis: true, // Lock movement to the x-axis to prevent dragging vertically
    onDrag: function () {
      // Update the scroll position
      scrollContainer.scrollLeft -= this.get('x') - this.startX;
    },
    onRelease: function () {
      // Reset position after dragging is done
      this.startX = this.get('x');
    },
  });
});
