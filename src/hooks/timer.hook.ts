import { useEffect, useState } from "react";

interface InitialTimer {
  time: number;
  initialTime?: number;
  onTick: (value: number) => void;
  onStop: () => void;
}

export function useTimer(initialData: InitialTimer) {
  const [percentage, setPercentage] = useState(0);
  const [running, setRunning] = useState(false);

  const [time, setTime] = useState(initialData.initialTime || 0);
  const [totalTime, setTotalTime] = useState(initialData.time);

  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if (running) {
      initialData.onTick(time);
    }
    setPercentage(((time || 0) * 100) / totalTime);
  }, [time, totalTime]);

  useEffect(() => {
    if (!running) {
      touch && initialData.onStop();
      return;
    }
    const loop = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(loop);
      if (!touch) setTouch(true);
    };
  }, [running]);

  function play(value?: boolean) {
    setRunning((r) => value ?? !r);
  }

  function resetValues(newTime: number, newTotalTime: number) {
    setTime(newTime);
    setTotalTime(newTotalTime);
  }

  return {
    play,
    percentage,
    running,
    time,
    totalTime,
    resetValues,
  };
}
