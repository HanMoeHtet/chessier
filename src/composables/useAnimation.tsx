import styles from './animation.module.css';

export const useAnimation = () => {
  const start = (el: HTMLElement) => {
    el.classList.add(styles.animate);
  };

  const stop = (el: HTMLElement) => {
    el.classList.remove(styles.animate);
  };

  const animate = (el: HTMLElement) => {
    start(el);
    el.addEventListener(
      'transitionend',
      () => {
        stop(el);
      },
      { once: true }
    );
  };

  return {
    start,
    stop,
    animate,
  };
};
