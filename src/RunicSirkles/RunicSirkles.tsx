import React, { useState } from "react";
import { RunesForText } from "./RunicText";

export const RunicSirkles = function () {
  const [text, setText] = useState("");

  return (
    <div style={{ paddingLeft: "2em" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <RunesForText text={text.toLowerCase()} /> 
    </div>
  );
};
