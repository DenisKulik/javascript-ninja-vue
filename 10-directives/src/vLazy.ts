const obsevers = new WeakMap<HTMLImageElement, IntersectionObserver>();

export const vLazy = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
        obsevers.delete(el);
      }
    });
    observer.observe(el);
    obsevers.set(el, observer);
  },
  unmounted(el: HTMLImageElement): void {
    obsevers.get(el)?.disconnect;
    obsevers.delete(el);
  },
};
