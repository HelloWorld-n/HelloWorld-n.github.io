import React from "react";
import { RunicRune } from "./RunicBaseComponents";

export function RunesForText(data: {
  text: string;
  color?: string;
  backgroundColor?: string;
}) {
  const spacing = 60;
  return (
    <svg style={{ backgroundColor: data.backgroundColor ?? "#22113322", width: "100%", height: "100%" }}>
      {data.text.split("").map((value, index) => (
        <g 
          key={index} 
          transform={`translate(${index * spacing}, 20)`} 
          data-value={value}
        >
          <RunicRune rune={value} color={data.color ?? "#CCAADD"} />
        </g>
      ))}
    </svg>
  );
}
