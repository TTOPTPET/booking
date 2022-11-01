import { useState, useEffect } from "react";

export const useClock = () => {
  const local = "ru";
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    console.log("useClk", time);
    const timer = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  let date = `${today.getDate()} ${today.toLocaleString(local, {
    month: "short",
  })} ${today.getFullYear()}`;

  let time = today.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  return { date, time };
};
