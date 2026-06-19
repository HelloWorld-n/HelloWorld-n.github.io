export function pixelsPerEm($elem) {
  return parseFloat(window.getComputedStyle($elem).fontSize);
}
