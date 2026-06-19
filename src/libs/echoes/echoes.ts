import { pixelsPerEm } from "../conversion/distance";

export function prepareEchoElements() {
  for (const $box of document.querySelectorAll("[id][data-echo]")) {
    try {
      const echoData = {
        n: 1,
        ...JSON.parse($box.getAttribute("data-echo") ?? "{}"),
      };

      const $echos = ((id: string) => {
        const $existing = document.querySelector(`[data-echo-of='${id}']`);
        if ($existing) {
          return $existing;
        }
        const $new = document.createElement("span");
        $new.setAttribute("data-echo-of", id);
        $new.style.setProperty("border", "0");
        console.info($new);
        return $new;
      })($box.getAttribute("id")!);

      while ($echos.querySelectorAll(`.echo`).length < echoData.n) {
        const $echo = $box.cloneNode() as HTMLElement;
        $echo.removeAttribute("id");
        $echo.classList.add("echo");
        $echo.style.setProperty("z-index", "-1");
        $echo.innerHTML = "";
        $echos.insertBefore($echo, null);
      }
      $box.insertBefore($echos, null);
    } catch (err) {
      console.error(err);
    }
  }
}
export function moveEchoRandomDir(
  $echo: HTMLElement,
  { updateStyles = [] }: { updateStyles?: Array<string> } = {},
) {
  const $orig = $echo?.parentNode?.parentNode as HTMLElement;
  const rect = $orig.getBoundingClientRect();
  rect.x += window.scrollX;
  rect.y += window.scrollY;
  const zoom = { value: 0.001, mv: 0.1 };
  const left = {
    value: rect.x + Math.random() * rect.width - 0.5 * pixelsPerEm($orig),
    mv: (0.5 - Math.random()) / 10,
  };
  const top = {
    value: rect.y + Math.random() * rect.height - 0.5 * pixelsPerEm($orig),
    mv: (0.5 - Math.random()) / 10,
  };

  const interval = setInterval(() => {
    for (const item of [zoom, left, top]) {
      item.value += item.mv;
    }
    if (zoom.value > 1) {
      zoom.mv = -0.001 + 0.0005 * Math.random();
    }
    $echo.style.position = "absolute";
    $echo.style.left = `${left.value}px`;
    $echo.style.top = `${top.value}px`;
    $echo.style.height = `${zoom.value}em`;
    $echo.style.width = `${zoom.value}em`;
    for (const updateStyle of updateStyles) {
      const styleVal = window
        .getComputedStyle($orig, null)
        .getPropertyValue(updateStyle);
      $echo.style.setProperty(updateStyle, styleVal);
    }
    if (zoom.value < 0) {
      $echo.remove();
      clearInterval(interval);
    }
  }, 10);

  return interval;
}
