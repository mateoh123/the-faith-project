"use client";

import { useState, useEffect } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

export default function Home() {
  const adjectives = [
    "Hope",
    "Love",
    "Ambition",
    "Wit",
    "Bravery",
    "Fear",
    "Enthusiasm",
    "Strength",
    "Passion",
    "Trust",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adjectives.length);
    }, 100);

    const timeout = setTimeout(() => {
      setIsFinished(true);
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [adjectives.length]);

  useEffect(() => {
    if (isFinished) {
      const fadeDelay = setTimeout(() => setShowTimer(true), 300);
      return () => clearTimeout(fadeDelay);
    }
  }, [isFinished]);

  const targetDate = new Date("2026-10-01T00:00:00");

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <p className="text-sm font-normal normal-case tracking-widest mt-4">
          Times up.
        </p>
      );
    }
    return (
      <p className="text-sm font-normal normal-case tracking-widest mt-4">
        {days}d {hours}h {minutes}m {seconds}s
      </p>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden max-h-screen relative">
      <main className="flex flex-col items-center justify-center font-black uppercase scale-y-150 text-center h-32 select-none">
        <h1>You Can Have</h1>

        {!isFinished && (
          <h1 className="line-through">{adjectives[currentIndex]}</h1>
        )}

        {isFinished && <h1>Faith</h1>}

        <div
          style={{
            opacity: showTimer ? 1 : 0,
            transition: "opacity 1s ease-in",
          }}
        >
          <Countdown date={targetDate} renderer={renderer} />
        </div>
      </main>
    </div>
  );
}
