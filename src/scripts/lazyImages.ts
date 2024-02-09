function lazyLoadImages() {
  console.log('lazyLoadImages');
  const lazyImages =
    document.querySelectorAll<HTMLImageElement>('[data-lazy="true"]');

  const lazyImageObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        if (!lazyImage.dataset.lazysrc) return;
        lazyImage.src = lazyImage.dataset.lazysrc;
        lazyImage.dataset.lazy = 'false';
        lazyImage.attributes.removeNamedItem('data-lazysrc');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
}

lazyLoadImages();

const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'characterData') {
      lazyLoadImages();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
