import React from 'react';

const LETTER = Symbol('LETTER');
const DIACTRIC = Symbol('DIACTRIC');

type StemType = 'x' | 'b' | 'j';

type LetterRune = {
  type: typeof LETTER;
  stem: StemType | 'dplc';
  modifier: 'th' | 'a' | 'e' | 'i' | 'o' | 'u' | 's';
};

type DiactricRune = {
  type: typeof DIACTRIC;
  stem: StemType;
  modifier: 'e' | 'o' | 's';
  modifierQuantity: 1 | 2 | 3;
  pos?: 0 | 1 | 2;
};

type BasicRune = LetterRune | DiactricRune;

export const runeData: { [glyph: string]: BasicRune } = {
  'x': {
    type: LETTER,
    stem: 'x',
    modifier: 'th',
  },
  'b': {
    type: LETTER,
    stem: 'b',
    modifier: 'th',
  },
  'j': {
    type: LETTER,
    stem: 'j',
    modifier: 'th',
  },
  //
  'k': {
    type: LETTER,
    stem: 'x',
    modifier: 'o',
  },
  'f': {
    type: LETTER,
    stem: 'b',
    modifier: 'o',
  },
  'p': {
    type: LETTER,
    stem: 'j',
    modifier: 'o',
  },
  'o': {
    type: LETTER,
    stem: 'dplc',
    modifier: 'o',
  },
  //
  'v': {
    type: LETTER,
    stem: 'x',
    modifier: 'u',
  },
  't': {
    type: LETTER,
    stem: 'b',
    modifier: 'u',
  },
  'c': {
    type: LETTER,
    stem: 'j',
    modifier: 'u',
  },
  'u': {
    type: LETTER,
    stem: 'dplc',
    modifier: 'u',
  },
  //
  'n': {
    type: LETTER,
    stem: 'x',
    modifier: 'a',
  },
  'w': {
    type: LETTER,
    stem: 'b',
    modifier: 'a',
  },
  'q': {
    type: LETTER,
    stem: 'j',
    modifier: 'a',
  },
  'a': {
    type: LETTER,
    stem: 'dplc',
    modifier: 'a',
  },
  //
  'z': {
    type: LETTER,
    stem: 'x',
    modifier: 'i',
  },
  's': {
    type: LETTER,
    stem: 'b',
    modifier: 'i',
  },
  'l': {
    type: LETTER,
    stem: 'j',
    modifier: 'i',
  },
  'i': {
    type: LETTER,
    stem: 'dplc',
    modifier: 'i',
  },
  //
  'd': {
    type: LETTER,
    stem: 'x',
    modifier: 'e',
  },
  'm': {
    type: LETTER,
    stem: 'b',
    modifier: 'e',
  },
  'h': {
    type: LETTER,
    stem: 'j',
    modifier: 'e',
  },
  'e': {
    type: LETTER,
    stem: 'dplc',
    modifier: 'e',
  },
  //
  'g': {
    type: LETTER,
    stem: 'x',
    modifier: 's',
  },
  'r': {
    type: LETTER,
    stem: 'b',
    modifier: 's',
  },
  'y': {
    type: LETTER,
    stem: 'j',
    modifier: 's',
  },
  //
  //
  //
  '\u0301': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'e',
    modifierQuantity: 1,
  },
  '\u030D': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'e',
    modifierQuantity: 2,
  },
  '\u0300': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'e',
    modifierQuantity: 3,
  },
  //
  '\u0302': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'o',
    modifierQuantity: 1,
  },
  '\u030C': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'o',
    modifierQuantity: 2,
  },
  '\u0303': {
    type: DIACTRIC,
    stem: 'x',
    modifier: 'o',
    modifierQuantity: 3,
  },
  //
  '\u0307': {
    type: DIACTRIC,
    stem: 'b',
    modifier: 'e',
    modifierQuantity: 1,
  },
  '\u0308': {
    type: DIACTRIC,
    stem: 'b',
    modifier: 'e',
    modifierQuantity: 2,
  },
  '\u030A': {
    type: DIACTRIC,
    stem: 'b',
    modifier: 'e',
    modifierQuantity: 3,
  },
};

function FullLine({ color }: { color: string }): React.ReactElement {
  return (
    <path
      style={{ stroke: color, fill: '#00000000' }}
      d="M 0,5 60,5"
      data-__label_internal__="line"
    />
  );
}

function Stem(data: { stem: BasicRune['stem']; color: string }): any {
  return (
    <>
      {data.stem === 'x' ? (
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="M 9.3,5.2 8.9,23.5"
          data-__label_internal__="stem_x"
        />
      ) : (
        <></>
      )}
      {data.stem === 'b' ? (
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="M 7.5,2.6 7.1,23.6 15.5,22.3"
          data-__label_internal__="stem_b"
        />
      ) : (
        <></>
      )}
      {data.stem === 'j' ? (
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="m 11.0,1.3 c 0.3,6.7 0.0,13.6 -0.0,20.3 l -4.2,0.5 7.7,-1.0"
          data-__label_internal__="stem_j"
        />
      ) : (
        <></>
      )}
    </>
  );
}

export const splitTextIntoRunes = (text: string): (string | DiactricRune)[] => {
  const textArray = text
    .toLowerCase()
    .normalize('NFD')
    .normalize('NFKD')
    .split('');
  const result: (string | DiactricRune)[] = [];
  const posFns: ((rune: LetterRune) => boolean)[] = [
    rune => rune.stem !== 'dplc' && !['e', 's'].includes(rune.modifier),
    rune => rune.stem === 'dplc',
    rune => rune.stem !== 'dplc' && ['e', 's'].includes(rune.modifier),
  ];
  let stem = undefined;
  let runePos: 0 | 1 | 2 = 0;
  let currentRune = ``;
  let diactrics: DiactricRune[] = [];

  const applyDiactrics = () => {
    for (const diactric of diactrics) {
      result.push(diactric);
    }
    diactrics = [];
  };

  const applyRune = () => {
    if (currentRune) {
      result.push(currentRune);
    }
    currentRune = ``;
    stem = undefined;
    runePos = 0;
  };

  for (let char of textArray) {
    const runeInfo = runeData[char];

    if (runeInfo?.type === DIACTRIC) {
      let diactricPos = (runePos + 2) % 3;
      const previousResult = result.at(-1);
      if (typeof previousResult === 'string' && ['x', 'b', 'j'].includes(previousResult)) {
        diactricPos = 0;
      }
      diactrics.push({ ...runeInfo, pos: diactricPos as 0 | 1 | 2 });
      applyRune();
      applyDiactrics();
      continue;
    }

    if ([' ', '\t', '\n', '\r'].includes(char)) {
      applyRune();
      currentRune = ` `;
      applyRune();
      continue;
    }

    if (!runeInfo) {
      applyRune();
      continue;
    }

    if (stem && runeInfo.stem !== stem && runeInfo.stem !== 'dplc') {
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
    if (runeInfo.stem !== 'dplc') {
      stem = runeInfo.stem;
    }
    if (runeInfo.modifier === 'th') {
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

export const RunicLetter = function (data: {
  rune: string;
  color: string;
}): React.ReactElement {
  const result = [];
  if (data.rune.length === 0 || !runeData[data.rune?.[0]]) {
    return <></>;
  }
  for (let char of data.rune) {
    if (runeData[char] !== undefined) {
      result.push(<FullLine color={data.color} />);
    }
    if (['th', 'u', 'a', 'i'].includes(runeData[char]?.modifier)) {
      result.push(
        <ellipse
          style={{ stroke: data.color, fill: '#00000000' }}
          data-__label_internal__="circle"
          cx="41"
          cy="20"
          rx="12"
          ry="12"
        />,
      );
    }
  }

  let stem: StemType = 'x';
  for (const char of data.rune) {
    if (['x', 'b', 'j'].includes(runeData[char].stem)) {
      stem = runeData[char].stem as StemType;
      break;
    }
  }

  result.push(<Stem stem={stem} color={data.color} />);

  for (let char of data.rune) {
    result.push(
      <g>
        {runeData[char]?.modifier === 'e' ? (
          runeData[char]?.stem !== 'dplc' ? (
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
        {runeData[char]?.modifier === 'u' ? (
          runeData[char]?.stem !== 'dplc' ? (
            <path
              style={{ stroke: data.color, fill: '#00000000' }}
              d="m 35.8,31 -3.5,5.5"
              data-__label_internal__="modifier_u"
            />
          ) : (
            <>
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="m 47.4,29.7 6.8,7.0"
                data-__label_internal__="modifier_u__double"
              />
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="m 49.1,28.2 6.5,6.2"
                data-__label_internal__="modifier_u__double"
              />
            </>
          )
        ) : (
          <></>
        )}
        {runeData[char]?.modifier === 'o' ? (
          runeData[char]?.stem !== 'dplc' ? (
            <path
              style={{ stroke: data.color, fill: '#00000000' }}
              d="m 28.7,10.1 c -2.7,2.5 -2.7,5.6 -2.1,8.7"
              data-__label_internal__="modifier_o"
            />
          ) : (
            <>
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="m 55.8,19.5 c 0.0,-2.8 -0.5,-6.2 -1.6,-8.8"
                data-__label_internal__="modifier_o__double"
              />
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="M 57.7,19.5 C 57.8,16.2 57.0,12.5 55.8,9.8"
                data-__label_internal__="modifier_o__double"
              />
            </>
          )
        ) : (
          <></>
        )}
        {runeData[char]?.modifier === 'a' ? (
          runeData[char]?.stem !== 'dplc' ? (
            <path
              style={{ stroke: data.color, fill: '#00000000' }}
              d="M 40.8,18.4 35.9,35.4"
              data-__label_internal__="modifier_a"
            />
          ) : (
            <>
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="m 43.6,25.5 7.6,9.3"
                data-__label_internal__="modifier_a__double"
              />
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="m 46.6,21.7 7.6,9.3"
                data-__label_internal__="modifier_a__double"
              />
            </>
          )
        ) : (
          <></>
        )}
        {runeData[char]?.modifier === 'i' ? (
          runeData[char]?.stem !== 'dplc' ? (
            <path
              style={{ stroke: data.color, fill: '#00000000' }}
              d="m 40.0,8.2 -8.0,32.3"
              data-__label_internal__="modifier_i"
            />
          ) : (
            <>
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="M 46.2,9.6 37.2,45.1"
                data-__label_internal__="modifier_i__double"
              />
              <path
                style={{ stroke: data.color, fill: '#00000000' }}
                d="M 47.9,10.1 38.8,45.5"
                data-__label_internal__="modifier_i__double"
              />
            </>
          )
        ) : (
          <></>
        )}
        {runeData[char]?.modifier === 's' ? (
          <path
            data-__label_internal__="modifer_s"
            style={{ stroke: data.color, fill: '#00000000' }}
            d="m 20.5,7.5 -0.5,0.5 3.9,4.0 -1.1,2.3 0.7,0.3 2.6,-5.1 -0.7,-0.3 -1.0,2.1 z"
          />
        ) : (
          <></>
        )}
      </g>,
    );
  }
  return <>{result}</>;
};

export const RunicDiactric = function (data: {
  rune: DiactricRune;
  color: string;
}): React.ReactElement {
  const result = [];
  result.push(<FullLine color={data.color} />);
  if (['th', 'u', 'a', 'i'].includes(data.rune.modifier)) {
    result.push(
      <ellipse
        style={{ stroke: data.color, fill: '#00000000' }}
        data-__label_internal__="circle"
        cx="41"
        cy="20"
        rx="12"
        ry="12"
      />,
    );
  }

  result.push(<Stem stem={data.rune.stem} color={data.color} />);

  if (data.rune.pos !== undefined) {
    result.push(
      <path
        style={{ stroke: data.color, fill: '#00000000' }}
        d="m 3,12 12,-2 z"
        data-__label_internal__="diactric_indicator"
      />,
    );
    if (data.rune.pos > 0) {
      result.push(
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="m 3,15 12,0 z"
          data-__label_internal__="diactric_indicator"
        />,
      );
      if (data.rune.pos > 1) {
        result.push(
          <path
            style={{ stroke: data.color, fill: '#00000000' }}
            d="m 3,18 12,2 z"
            data-__label_internal__="diactric_indicator"
          />,
        );
      }
    }
  }

  if (data.rune.modifier === 'e') {
    result.push(
      <ellipse
        style={{ stroke: data.color, fill: data.color }}
        cx="25"
        cy="10"
        rx="1.6"
        ry="1.6"
        data-__label_internal__="modifier_e"
      />,
    );
    if (data.rune.modifierQuantity > 1) {
      result.push(
        <ellipse
          style={{ stroke: data.color, fill: data.color }}
          cx="35"
          cy="10"
          rx="1.6"
          ry="1.6"
          data-__label_internal__="modifier_e"
        />,
      );
    }
    if (data.rune.modifierQuantity > 2) {
      result.push(
        <ellipse
          style={{ stroke: data.color, fill: data.color }}
          cx="45"
          cy="10"
          rx="1.6"
          ry="1.6"
          data-__label_internal__="modifier_e"
        />,
      );
    }
  }

  if (data.rune.modifier === 'o') {
    result.push(
      <path
        style={{ stroke: data.color, fill: '#00000000' }}
        d="m 30,30 c 0.0,-2.8 -10.5,-6.2 -10.6,-4.8"
        data-__label_internal__="modifier_o"
      />,
    );
    if (data.rune.modifierQuantity > 1) {
      result.push(
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="m 40,27.5 c 0.0,-2.8 -10.5,-6.2 -10.6,-4.8"
          data-__label_internal__="modifier_o"
        />,
      );
    }
    if (data.rune.modifierQuantity > 2) {
      result.push(
        <path
          style={{ stroke: data.color, fill: '#00000000' }}
          d="m 50,25 c 0.0,-2.8 -10.5,-6.2 -10.6,-4.8"
          data-__label_internal__="modifier_o"
        />,
      );
    }
  }

  return <>{result}</>;
};

export const RunicRune = (data: {
  rune: string | DiactricRune;
  color: string;
}): React.ReactElement => {
  if (typeof data.rune === 'string') {
    return <RunicLetter rune={data.rune} color={data.color} />;
  }
  if (data.rune.type === DIACTRIC) {
    return <RunicDiactric rune={data.rune} color={data.color} />;
  }
  return <></>;
};
