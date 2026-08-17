import React from "react";

const LETTER = Symbol("LETTER");

type BasicRune = {
  stem: "x" | "b" | "j" | "dplc";
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
    stem: "dplc",
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
    stem: "dplc",
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
    stem: "dplc",
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
    stem: "dplc",
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
    stem: "dplc",
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

export const splitTextIntoRunes = function (text: string): string[] {
  const textArray = text.toLowerCase().split("");
  const result: string[] = [];
  const posFns: ((rune: BasicRune) => boolean)[] = [
    (rune) => rune.stem !== "dplc" && !["e", "s"].includes(rune.modifier),
    (rune) => rune.stem === "dplc",
    (rune) => rune.stem !== "dplc" && ["e", "s"].includes(rune.modifier),
  ];
  let stem = undefined;
  let runePos = 0;
  let currentRune = ``;

  const applyRune = () => {
    result.push(currentRune);
    currentRune = ``;
    stem = undefined;
    runePos = 0;
  };

  for (let char of textArray) {
    const runeInfo = runeData[char];
    if ([" ", "\t", "\n", "\r"].includes(char)) {
      applyRune();
      currentRune = ` `;
      applyRune();
      continue;
    }

    if (!runeInfo) {
      applyRune();
      continue;
    }

    if (stem && runeInfo.stem !== stem && runeInfo.stem !== "dplc") {
      applyRune();
    }

    while (!posFns[runePos](runeInfo)) {
      runePos++;
      if (runePos >= posFns.length) {
        applyRune();
        break;
      }
    }

    currentRune = `${currentRune}${char}`;
    if (runeInfo.stem !== "dplc") {
      stem = runeInfo.stem;
    }
    if (runeInfo.modifier === "th") {
      applyRune();
      continue;
    }

    runePos++;
    if (runePos >= posFns.length) {
      applyRune();
      continue;
    }
  }
  if (currentRune) {
    applyRune();
  }
  return result;
};

export const RunicRune = function (data: {
  rune: string;
  color: string;
}): React.ReactElement {
  const result = [];
  if (data.rune.length === 0 || !runeData[data.rune?.[0]]) {
    return <></>;
  }
  for (let char of data.rune) {
    if (runeData[char] !== undefined) {
      result.push(
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 0,5 60,5"
          data-__label_internal__="line"
        />,
      );
    }
    if (["th", "u", "a", "i"].includes(runeData[char]?.modifier)) {
      result.push(
        <ellipse
          style={{ stroke: data.color, fill: "#00000000" }}
          data-__label_internal__="circle"
          cx="41"
          cy="20"
          rx="12"
          ry="12"
        />,
      );
    }
  }

  let stem: BasicRune["stem"] = "x";
  for (let char of data.rune) {
    if (
      (["x", "b", "j"] as BasicRune["stem"][]).includes(runeData[char].stem)
    ) {
      stem = runeData[char].stem;
      break;
    }
  }

  result.push(
    <>
      {stem === "x" ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 9.3,5.2 8.9,23.5"
          data-__label_internal__="stem_x"
        />
      ) : (
        <></>
      )}
      {stem === "b" ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="M 7.5,2.6 7.1,23.6 15.5,22.3"
          data-__label_internal__="stem_b"
        />
      ) : (
        <></>
      )}
      {stem === "j" ? (
        <path
          style={{ stroke: data.color, fill: "#00000000" }}
          d="m 11.0,1.3 c 0.3,6.7 0.0,13.6 -0.0,20.3 l -4.2,0.5 7.7,-1.0"
          data-__label_internal__="stem_j"
        />
      ) : (
        <></>
      )}
    </>,
  );

  for (let char of data.rune) {
    result.push([
      <g>
        {runeData[char]?.modifier === "e" ? (
          runeData[char]?.stem !== "dplc" ? (
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
        {runeData[char]?.modifier === "u" ? (
          runeData[char]?.stem !== "dplc" ? (
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
        {runeData[char]?.modifier === "o" ? (
          runeData[char]?.stem !== "dplc" ? (
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
        {runeData[char]?.modifier === "a" ? (
          runeData[char]?.stem !== "dplc" ? (
            <path
              style={{ stroke: data.color, fill: "#00000000" }}
              d="M 40.8,18.4 35.9,35.4"
              data-__label_internal__="modifier_a"
            />
          ) : (
            <>
              <path
                style={{ stroke: data.color, fill: "#00000000" }}
                d="m 43.6,25.5 7.6,9.3"
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
        {runeData[char]?.modifier === "i" ? (
          runeData[char]?.stem !== "dplc" ? (
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
        {runeData[char]?.modifier === "s" ? (
          <path
            data-__label_internal__="modifer_s"
            style={{ stroke: data.color, fill: "#00000000" }}
            d="m 20.5,7.5 -0.5,0.5 3.9,4.0 -1.1,2.3 0.7,0.3 2.6,-5.1 -0.7,-0.3 -1.0,2.1 z"
          />
        ) : (
          <></>
        )}
      </g>,
    ]);
  }
  return <>{result}</>;
};
