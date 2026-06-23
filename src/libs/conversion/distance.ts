export function pixelsPerEm($elem: HTMLElement): number {
  return parseFloat(window.getComputedStyle($elem).fontSize);
}
