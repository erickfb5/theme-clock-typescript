import React, { useState, useEffect } from "react";

import "./App.css";
import { days } from "./days";
import { months } from "./months";

const App: React.FC<{}> = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId: NodeJS.Timer = setInterval(
      () => setTime(new Date()),
      1000
    );
    const html: HTMLElement | null = document.querySelector("html");
    if (html) {
      html.classList.toggle("dark", isDark);
    }
    return () => clearInterval(intervalId);
  }, [isDark]);

  const hours: number = time.getHours();
  const hoursForClock: number = hours >= 13 ? hours % 12 : hours;
  const minutes: number = time.getMinutes();
  const seconds: number = time.getSeconds();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  const day: number = time.getDay();
  const month: number = time.getMonth();
  const date: number = time.getDate();

  const scale = (
    num: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ) => ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  return (
    <div>
      <button className="toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light mode" : "Dark mode"}
      </button>

      <div className={`clock-container ${isDark ? "dark" : ""}`}>
        <div className="clock">
          <div
            className="needle hour"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                hoursForClock,
                0,
                12,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div
            className="needle minute"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                minutes,
                0,
                60,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div
            className="needle second"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                seconds,
                0,
                60,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div className="center-point"></div>
        </div>

        <div className="time">{`${hoursForClock}:${
          minutes < 10 ? `0${minutes}` : minutes
        } ${ampm}`}</div>
        <div className="date">
          {`${days[day]}, ${months[month]}`}
          <span className="circle">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
