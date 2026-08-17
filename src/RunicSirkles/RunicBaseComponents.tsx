import React from "react";

const DOUBLE = Symbol("DOUBLE");
const LETTER = Symbol("LETTER");
type BasicRune = {
  stem: string | "x" | "b" | "j" | typeof DOUBLE;
  modifier: "th" | "a" | "e" | "i" | "o" | "u" | "s";
  type: typeof LETTER;
};

export const runeData: { [glyph: string]: BasicRune } = {
  x: {
    stem: "x",
    modifier: "th",
    type: LETTER,
  },
  b: {
    stem: "b",
    modifier: "th",
    type: LETTER,
  },
  j: {
    stem: "j",
    modifier: "th",
    type: LETTER,
  },
  //
  k: {
    stem: "x",
    modifier: "o",
    type: LETTER,
  },
  f: {
    stem: "b",
    modifier: "o",
    type: LETTER,
  },
  p: {
    stem: "j",
    modifier: "o",
    type: LETTER,
  },
  o: {
    stem: DOUBLE,
    modifier: "o",
    type: LETTER,
  },
  //
  v: {
    stem: "x",
    modifier: "u",
    type: LETTER,
  },
  t: {
    stem: "b",
    modifier: "u",
    type: LETTER,
  },
  c: {
    stem: "j",
    modifier: "u",
    type: LETTER,
  },
  u: {
    stem: DOUBLE,
    modifier: "u",
    type: LETTER,
  },
  //
  n: {
    stem: "x",
    modifier: "a",
    type: LETTER,
  },
  w: {
    stem: "b",
    modifier: "a",
    type: LETTER,
  },
  q: {
    stem: "j",
    modifier: "a",
    type: LETTER,
  },
  a: {
    stem: DOUBLE,
    modifier: "a",
    type: LETTER,
  },
  //
  z: {
    stem: "x",
    modifier: "i",
    type: LETTER,
  },
  s: {
    stem: "b",
    modifier: "i",
    type: LETTER,
  },
  l: {
    stem: "j",
    modifier: "i",
    type: LETTER,
  },
  i: {
    stem: DOUBLE,
    modifier: "i",
    type: LETTER,
  },
  //
  d: {
    stem: "x",
    modifier: "e",
    type: LETTER,
  },
  m: {
    stem: "b",
    modifier: "e",
    type: LETTER,
  },
  h: {
    stem: "j",
    modifier: "e",
    type: LETTER,
  },
  e: {
    stem: DOUBLE,
    modifier: "e",
    type: LETTER,
  },
  //
  g: {
    stem: "x",
    modifier: "s",
    type: LETTER,
  },
  r: {
    stem: "b",
    modifier: "s",
    type: LETTER,
  },
  y: {
    stem: "j",
    modifier: "s",
    type: LETTER,
  },
};

export const RunicRune = function (data: { rune: string; color: string }) {
  return (
    <g>
      {["th", "u", "a", "i"].includes(runeData[data.rune]?.modifier) ? (
        <ellipse
          style={{ stroke: data.color, fill: "#00000000" }}
          data-__label_internal__="circle"
          cx="41"
          cy="20"
          rx="12"
          ry="12"
        />
      ) : (
        <></>
      )}
      {runeData[data.rune] === undefined ? (
        <></>
      ) : (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 0,5 60,5"
          data-__label_internal__="line"
        />
      )}
      {runeData[data.rune]?.stem === "x" ||
      runeData[data.rune]?.stem === DOUBLE ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 9.3,5.2 8.9,23.5"
          data-__label_internal__="stem_x"
        />
      ) : (
        <></>
      )}
      {runeData[data.rune]?.stem === "b" ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 7.5,2.6 7.1,23.6 15.5,22.3"
          data-__label_internal__="stem_b"
        />
      ) : (
        <></>
      )}
      {runeData[data.rune]?.stem === "j" ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="m 11.0,1.3 c 0.3,6.7 0.0,13.6 -0.0,20.3 l -4.2,0.5 7.7,-1.0"
          data-__label_internal__="stem_j"
        />
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "e" ? (
        runeData[data.rune]?.stem !== DOUBLE ? (
          <ellipse
            style={{ stroke: data.color, fill: data.color }}
            cx="26.6"
            cy="29.3"
            rx="1.6"
            ry="1.6"
            data-__label_internal__="modifier_e"
          />
        ) : (
          <>
            <ellipse
              style={{ stroke: data.color, fill: data.color }}
              cx="55.2"
              cy="26.7"
              rx="1.6"
              ry="1.6"
              data-__label_internal__="modifier_e__double"
            />
            <ellipse
              style={{ stroke: data.color, fill: data.color }}
              cx="56.5"
              cy="22.2"
              rx="1.6"
              ry="1.6"
              data-__label_internal__="modifier_e__double"
            />
          </>
        )
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "u" ? (
        runeData[data.rune]?.stem !== DOUBLE ? (
          <path
            style={{ stroke: data.color, fill: "#00000000" }}
            d="m 35.8,31 -3.5,5.5"
            data-__label_internal__="modifier_u"
          />
        ) : (
          <>
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="m 47.4,29.7 6.8,7.0"
              data-__label_internal__="modifier_u__double"
            />
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="m 49.1,28.2 6.5,6.2"
              data-__label_internal__="modifier_u__double"
            />
          </>
        )
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "o" ? (
        runeData[data.rune]?.stem !== DOUBLE ? (
          <path
            style={{ stroke: data.color, fill: "#00000000" }}
            d="m 28.7,10.1 c -2.7,2.5 -2.7,5.6 -2.1,8.7"
            data-__label_internal__="modifier_o"
          />
        ) : (
          <>
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="m 55.8,19.5 c 0.0,-2.8 -0.5,-6.2 -1.6,-8.8"
              data-__label_internal__="modifier_o__double"
            />
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="M 57.7,19.5 C 57.8,16.2 57.0,12.5 55.8,9.8"
              data-__label_internal__="modifier_o__double"
            />
          </>
        )
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "a" ? (
        runeData[data.rune]?.stem !== DOUBLE ? (
          <path
            style={{ stroke: data.color, fill: "#00000000" }}
            d="M 40.8,18.4 35.9,35.4"
            data-__label_internal__="modifier_a"
          />
        ) : (
          <>
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="m 45.6,22.5 7.6,9.3"
              data-__label_internal__="modifier_a__double"
            />
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="m 46.6,21.7 7.6,9.3"
              data-__label_internal__="modifier_a__double"
            />
          </>
        )
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "i" ? (
        runeData[data.rune]?.stem !== DOUBLE ? (
          <path
            style={{ stroke: data.color, fill: "#00000000" }}
            d="m 40.0,8.2 -8.0,32.3"
            data-__label_internal__="modifier_i"
          />
        ) : (
          <>
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="M 46.2,9.6 37.2,45.1"
              data-__label_internal__="modifier_i__double"
            />
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="M 47.9,10.1 38.8,45.5"
              data-__label_internal__="modifier_i__double"
            />
          </>
        )
      ) : (
        <></>
      )}
      {runeData[data.rune]?.modifier === "s" ? (
        <path
          data-__label_internal__="modifer_s"
          style={{ stroke: data.color, fill: "#00000000" }}
          d="m 20.5,7.5 -0.5,0.5 3.9,4.0 -1.1,2.3 0.7,0.3 2.6,-5.1 -0.7,-0.3 -1.0,2.1 z"
        />
      ) : (
        <></>
      )}
    </g>
  );
};
