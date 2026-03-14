export const HEADER_OFFSET = 112;

export const getScrollTarget = (element: HTMLElement, offset = HEADER_OFFSET) => {
  const { top } = element.getBoundingClientRect();
  return Math.max(0, top + window.scrollY - offset);
};

export const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth') => {
  const targetId = hash.replace('#', '');

  if (!targetId) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const element = document.getElementById(targetId);

  if (!element) {
    return;
  }

  window.scrollTo({
    top: getScrollTarget(element),
    behavior
  });
};
