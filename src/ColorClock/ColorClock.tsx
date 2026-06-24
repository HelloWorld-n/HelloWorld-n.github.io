import React, { useEffect } from "react";

import { prepareEchoElements, moveEchoRandomDir } from "../libs/echoes/echoes";

export function getZonedNow(): Temporal.ZonedDateTime {
  return Temporal.Now.zonedDateTimeISO();
}

function tick(): void {
  getNow();
}

export function getTimezoneName(zdt: Temporal.ZonedDateTime): string {
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: zdt.timeZoneId,
    timeZoneName: "long",
  });

  const parts = formatter.formatToParts(new Date(zdt.epochMilliseconds));

  return parts.find((p) => p.type === "timeZoneName")!.value;
}

interface TimeUnit {
  v: number;
  min: number;
  max: number;
}

interface TimeData {
  year: TimeUnit;
  month: TimeUnit;
  day: TimeUnit;
  hour: TimeUnit;
  minute: TimeUnit;
  second: TimeUnit;
}

function getNow(): void {
  const zdt = getZonedNow();

  const year: TimeUnit = { v: zdt.year, min: 0, max: 1000 };
  const month: TimeUnit = { v: zdt.month, min: 1, max: 12 };
  const day: TimeUnit = { v: zdt.day, min: 1, max: 31 };
  const hour: TimeUnit = { v: zdt.hour, min: 0, max: 24 };
  const minute: TimeUnit = { v: zdt.minute, min: 0, max: 60 };
  const second: TimeUnit = { v: zdt.second, min: 0, max: 60 };

  const secondsSinceEpoch: number = Math.round(Date.now() / 1000);
  const data: TimeData = { year, month, day, hour, minute, second };

  let val: number,
    min: number,
    max: number,
    hue: number,
    $elem: HTMLElement | null;

  for (let unit in data) {
    $elem = document.getElementById(unit);
    if (!$elem) continue;
    const unitData = (data as any)[unit] as TimeUnit;
    val = unitData.v;
    min = unitData.min;
    max = unitData.max;
    hue = getHue(val, min, max);

    const textElem = $elem.querySelector(".text");
    if (textElem)
      textElem.textContent = (String(val).length > 1 ? "" : "0") + String(val);
    ($elem.style as CSSStyleDeclaration).backgroundColor =
      `hsl(${hue}, 70%, 30%)`;
    ($elem.style as CSSStyleDeclaration).color = `hsl(${hue}, 70%, 70%)`;
  }

  const timezoneName: string = getTimezoneName(zdt);
  const offset: string = zdt.offset;

  hue = getHue(secondsSinceEpoch, 0, Number(year.v));
  $elem = document.getElementById("timezone");
  if ($elem) {
    const textElem = $elem.querySelector(".text");
    if (textElem) textElem.textContent = `[${timezoneName}] (UTC${offset})`;
    ($elem.style as CSSStyleDeclaration).backgroundColor =
      `hsl(${hue}, 50%, 20%)`;
    ($elem.style as CSSStyleDeclaration).color = `hsl(${hue}, 50%, 80%)`;
  }
}

function getHue(value: number, min: number, max: number): number {
  return Math.round(((value - min) / (max - min)) * 360);
}

setInterval(() => {
  prepareEchoElements();
  for (const $echoElem of document.querySelectorAll(".echo")) {
    const elem = $echoElem as HTMLElement;
    if (!elem.getAttribute("data-echo-moving")) {
      const movingPid = moveEchoRandomDir(elem, {
        updateStyles: ["background-color"],
      });
      elem.setAttribute("data-echo-moving", String(movingPid));
    }
  }
}, 30);

export function ColorClock() {
  useEffect((): (() => void) => {
    const intervalId = window.setInterval(tick, 250);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div className="data">
        <span className="box" id="year" data-echo='{"n": 2}'>
          <span className="text">????</span>
        </span>
        <span className="box" id="month" data-echo='{"n": 2}'>
          <span className="text">??</span>
        </span>
        <span className="box" id="day" data-echo='{"n": 2}'>
          <span className="text">??</span>
        </span>
      </div>
      <div className="data">
        <span className="box" id="hour" data-echo='{"n": 3}'>
          <span className="text">??</span>
        </span>
        <span className="box" id="minute" data-echo='{"n": 3}'>
          <span className="text">??</span>
        </span>
        <span className="box" id="second" data-echo='{"n": 3}'>
          <span className="text">??</span>
        </span>
      </div>
      <div className="data">
        <span className="box smaller" id="timezone" data-echo='{"n": 15}'>
          <span className="text">[???] (UTC±??:??)</span>
        </span>
      </div>
    </>
  );
}
