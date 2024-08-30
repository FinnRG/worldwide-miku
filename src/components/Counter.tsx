import { useEffect, useState } from "react";

interface CounterProps {
  endNumber: number;
  subtitle: string;
}

const Counter = ({ endNumber, subtitle }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (start === endNumber) return;

    const totalDuration = 2000; // total duration in milliseconds
    const incrementTime = Math.abs(Math.floor(totalDuration / endNumber));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start === endNumber) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [endNumber]);

  return (
    <div className="text-center p-4">
      <div className={"text-teal-500 text-5xl font-bold"}>{count}</div>
      <div className={"text-teal-500 text-xl mt-2"}>{subtitle}</div>
    </div>
  );
};

export default Counter;
