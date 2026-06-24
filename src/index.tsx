import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import { ColorClock, getTimezoneName } from "./ColorClock/ColorClock";
import { getZonedNow } from "./ColorClock/ColorClock";

const root = createRoot(document.getElementById("root") as HTMLElement);

function useDynamicTitle() {
  useEffect(() => {
    const id = setInterval(() => {
      const nowTime = getZonedNow();
      const nowToSecond = nowTime.toString().split(".")[0];
      const nowTimezone = getTimezoneName(nowTime);
      document.title = `${nowToSecond} ${nowTimezone}`;
    }, 200);

    return () => clearInterval(id);
  }, []);
}

function App() {
  useDynamicTitle();

  return (
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
              <Link to="/">Return</Link>
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
}

root.render(<App />);
