import { ref, onMounted, onUnmounted } from 'vue';

export default function useScrollToTopButton() {
  const isAtTop = ref(true);

  const checkScrollPosition = () => {
    isAtTop.value = window.pageYOffset < 400;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition);
  });

  return {
    isAtTop,
    scrollToTop
  };
}
