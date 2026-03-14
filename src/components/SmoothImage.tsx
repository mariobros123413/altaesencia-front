import { ImgHTMLAttributes, useEffect, useState } from 'react';

interface SmoothImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  skeletonClassName?: string;
}

const SmoothImage = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  ...props
}: SmoothImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

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
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`.trim()}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default SmoothImage;
