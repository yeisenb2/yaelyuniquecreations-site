// ---------------------------------------------------------------
// Product photo lightbox
//
// Each clickable photo is a <button class="product-photo"> with a
// data-images attribute listing one or more filenames, separated
// by commas: data-images="a.jpg,b.jpg,c.jpg"
//
// A piece with just one photo still works fine — clicking it opens
// the lightbox showing that single image, with the arrow buttons
// hidden since there's nowhere else to go.
// ---------------------------------------------------------------

const overlay = document.querySelector('.lightbox-overlay');

// Only run this script's logic on pages that actually have a
// lightbox in their HTML (every category page will, but this
// guards against errors if it's ever missing).
if (overlay) {
  const imgEl = overlay.querySelector('.lightbox-img');
  const counterEl = overlay.querySelector('.lightbox-counter');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const closeBtn = overlay.querySelector('.lightbox-close');

  let currentImages = [];
  let currentIndex = 0;

  function render() {
    imgEl.src = currentImages[currentIndex];
    counterEl.textContent = currentImages.length > 1
      ? `${currentIndex + 1} / ${currentImages.length}`
      : '';
    // Hide the arrows entirely when there's only one photo —
    // nothing to navigate to.
    const multiple = currentImages.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  }

  function open(images) {
    currentImages = images;
    currentIndex = 0;
    render();
    overlay.hidden = false;
  }

  function close() {
    overlay.hidden = true;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    render();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    render();
  }

  // Event delegation: one listener on the whole page catches clicks
  // on ANY product-photo button, present now or added later, rather
  // than wiring up each one individually.
  document.addEventListener('click', (event) => {
    const photoBtn = event.target.closest('.product-photo');
    if (photoBtn) {
      const images = photoBtn.dataset.images.split(',').map((s) => s.trim());
      open(images);
    }
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Click the dark background (not the image itself) to close.
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  // Keyboard support: Escape closes, arrow keys navigate.
  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') showPrev();
    if (event.key === 'ArrowRight') showNext();
  });
}
