import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { ColorClock } from "./ColorClock/ColorClock";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <HashRouter>
    <nav></nav>
    <Routes>
      <Route path="/" element={<Navigate to="/color-clock" />} />
      <Route path="/color-clock" element={<ColorClock />} />
      <Route path="*" element={<><h1 data-status="404">Not Found</h1></>} />
    </Routes>
  </HashRouter>,
);
