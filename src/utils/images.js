/**
 * src/utils/images.js
 * Build responsive image URLs for Pexels-hosted photos.
 * Pexels' CDN resizes on the fly, and `auto=compress` serves WebP to browsers
 * that support it, so we get modern formats without a local image pipeline.
 */

const PEXELS_BASE = 'https://images.pexels.com/photos';

/**
 * Build a single Pexels image URL.
 * @param {number} id - Pexels photo id (the number at the end of a pexels.com/photo/... URL)
 * @param {{ w: number, h?: number }} size - width, plus height to centre-crop to an exact size
 * @returns {string}
 */
export function pexelsUrl(id, { w, h }) {
  const crop = h ? `&h=${h}&fit=crop` : '';
  return `${PEXELS_BASE}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${crop}`;
}

/**
 * Build a `srcset` string for a Pexels photo.
 * @param {number} id - Pexels photo id
 * @param {number[]} widths - candidate widths in px, e.g. [400, 800]
 * @param {number} [aspect] - optional height ÷ width ratio to crop every candidate, e.g. 1.25 for 4:5
 * @returns {string} e.g. "…w=400&h=500&fit=crop 400w, …w=800&h=1000&fit=crop 800w"
 */
export function pexelsSrcSet(id, widths, aspect) {
  return widths.map((w) => `${pexelsUrl(id, { w, h: aspect ? Math.round(w * aspect) : undefined })} ${w}w`).join(', ');
}
