import { MouseEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToHash } from '../lib/scroll';

interface SmoothScrollLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const SmoothScrollLink = ({ to, className, children, onClick }: SmoothScrollLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    onClick?.();

    const targetUrl = new URL(to, window.location.origin);
    const targetPath = targetUrl.pathname;
    const targetHash = targetUrl.hash;
    const isSamePath = location.pathname === targetPath;
    const isSameLocation = isSamePath && location.hash === targetHash;
    const nextLocation = `${targetPath}${targetHash}`;

    if (!isSameLocation) {
      navigate(nextLocation);
    }

    if (isSamePath && targetHash) {
      window.requestAnimationFrame(() => {
        scrollToHash(targetHash);
      });
    }

    if (isSamePath && !targetHash) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
