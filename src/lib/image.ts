const PEXELS_HOST = 'images.pexels.com';

export const getOptimizedImageSrc = (src: string | undefined, width = 1200) => {
  if (!src) {
    return src;
  }

  try {
    const url = new URL(src);

    if (url.hostname !== PEXELS_HOST) {
      return src;
    }

    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', '80');

    return url.toString();
  } catch {
    return src;
  }
};

export const getOptimizedImageSrcSet = (src: string | undefined, width = 1200) => {
  if (!src) {
    return undefined;
  }

  const oneX = getOptimizedImageSrc(src, width);
  const twoX = getOptimizedImageSrc(src, width * 2);

  if (!oneX || !twoX || oneX === src) {
    return undefined;
  }

  return `${oneX} 1x, ${twoX} 2x`;
};
