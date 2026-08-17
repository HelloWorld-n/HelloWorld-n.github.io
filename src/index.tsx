import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import { ColorClock, getTimezoneName } from "./ColorClock/ColorClock";
import { getZonedNow } from "./ColorClock/ColorClock";
import { RunicSirkles } from "./RunicSirkles/RunicSirkles";

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
      <nav style={{ display: "flex", gap: "1rem", justifyContent: "center"}}>
        <Link to="/color-clock">Color Clock</Link>
        <Link to="/runic-sirkles">Runic Sirkles</Link>
      </nav>
      <br/>
      <Routes>
        <Route path="/" element={<Navigate to="/color-clock" />} />
        <Route path="/color-clock" element={<ColorClock />} />
        <Route path="/runic-sirkles" element={<RunicSirkles />} />
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
