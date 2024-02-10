// src/scripts/lazyImages.ts
var lazyLoadImages = function() {
  const lazyImages = document.querySelectorAll('[data-lazy="true"]');
  const lazyImageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        if (!lazyImage.dataset.lazysrc)
          return;
        lazyImageObserver.unobserve(lazyImage);
        lazyImage.src = lazyImage.dataset.lazysrc;
        lazyImage.dataset.lazy = "false";
        lazyImage.removeAttribute("data-lazysrc");
      }
    });
  });
  lazyImages.forEach(function(lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
};
lazyLoadImages();
var observer = new MutationObserver(function(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "characterData") {
      lazyLoadImages();
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });
