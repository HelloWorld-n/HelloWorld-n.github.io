import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { ColorClock, getTimezoneName } from "./ColorClock/ColorClock";
import { getZonedNow } from "./ColorClock/ColorClock";

const root = createRoot(document.getElementById("root") as HTMLElement);
const title = createRoot(document.querySelector("title") as HTMLElement);

function Title(props = {}) {
  const [now, setNow] = useState<string>();
  setInterval(() => {
    const nowTime = getZonedNow();
    const nowTosecond = nowTime.toString().split(".")[0];
    const nowTimezone = getTimezoneName(nowTime);
    setNow(`${nowTosecond} ${nowTimezone}`);
  }, 200);
  return <>{now}</>;
}

title.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<Title />} />
    </Routes>
  </HashRouter>,
);

root.render(
  <HashRouter>
    <nav></nav>
    <Routes>
      <Route path="/" element={<Navigate to="/color-clock" />} />
      <Route path="/color-clock" element={<ColorClock />} />
      <Route
        path="*"
        element={
          <>
            <h1 data-status="404">Not Found</h1>
            <a href="/#/">Return</a>
          </>
        }
      />
    </Routes>
  </HashRouter>,
);
