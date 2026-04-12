import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { getOptimizedImageSrc, getOptimizedImageSrcSet } from '../lib/image';

interface SmoothImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  skeletonClassName?: string;
  optimizedWidth?: number;
  priority?: boolean;
}

const SmoothImage = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  optimizedWidth = 1200,
  priority = false,
  fetchPriority,
  ...props
}: SmoothImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = getOptimizedImageSrc(src, optimizedWidth);
  const optimizedSrcSet = getOptimizedImageSrcSet(src, optimizedWidth);
  const fetchPriorityValue = fetchPriority || (priority ? 'high' : 'auto');
  const imagePriorityProps = fetchPriorityValue ? { fetchpriority: fetchPriorityValue } : {};

  useEffect(() => {
    setIsLoaded(false);
  }, [optimizedSrc]);

  return (
    <div className={`relative overflow-hidden bg-[#111917] ${wrapperClassName}`.trim()}>
      <div
        className={[
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          isLoaded ? 'opacity-0' : 'opacity-100',
          skeletonClassName || 'bg-gradient-to-br from-[#15211c] via-[#0d1411] to-[#1c2a24]'
        ].join(' ')}
        aria-hidden="true"
      >
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_45%)]" />
      </div>

      <img
        {...props}
        {...imagePriorityProps}
        src={optimizedSrc}
        srcSet={props.srcSet || optimizedSrcSet}
        alt={alt}
        loading={props.loading || (priority ? 'eager' : 'lazy')}
        decoding={props.decoding || 'async'}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`.trim()}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default SmoothImage;
