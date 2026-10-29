/**
 * src/components/Photo.jsx
 * Responsive, lazy-loaded Pexels photo inside a branded frame.
 * The frame shows a subtle striped placeholder while the photo loads, and stays
 * as a clean fallback if the photo fails, so a slow network never leaves an
 * empty black box or a broken-image icon.
 */
import { useState } from 'react';
import { pexelsSrcSet, pexelsUrl } from '../utils/images';

/**
 * @param {{
 *   id: number,              // Pexels photo id
 *   alt: string,             // "" for decorative photos
 *   width: number,           // intrinsic size of the default candidate, for layout stability
 *   height: number,
 *   widths?: number[],       // srcset candidates
 *   sizes?: string,
 *   priority?: boolean,      // true for above-the-fold images (eager + high priority)
 *   className?: string,      // classes for the frame (set size / aspect ratio here)
 *   imgClassName?: string,   // extra classes for the <img>
 * }} props
 */
export default function Photo({
  id,
  alt,
  width,
  height,
  widths = [400, 800, 1200],
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
}) {
  const [failed, setFailed] = useState(false);
  const aspect = height / width;

  return (
    <div className={`photo-frame ${className}`}>
      {!failed && (
        <img
          src={pexelsUrl(id, { w: width, h: height })}
          srcSet={pexelsSrcSet(id, widths, aspect)}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
