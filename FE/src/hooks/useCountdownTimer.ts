import { useEffect, useState } from 'react';

type Props = {
  endTime: string;
};
export const useCountdownTimer = ({ endTime }: Props) => {
  const [dayDozens, setDayDozens] = useState(0);
  const [dayUnits, setDayUnits] = useState(0);
  const [hourDozens, setHourDozens] = useState(0);
  const [hoursUnits, setHoursUnits] = useState(0);
  const [minutesDozens, setMinutesDozens] = useState(0);
  const [minutesUnits, setMinutesUnits] = useState(0);
  const [secondDozens, setSecondDozens] = useState(0);
  const [secondUnits, setSecondUnits] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(true);

  const updateState = (days: number, hours: number, minutes: number, seconds: number) => {
    setDayDozens(Math.floor(days / 10));
    setDayUnits(days % 10);
    setHourDozens(Math.floor(hours / 10));
    setHoursUnits(hours % 10);
    setMinutesDozens(Math.floor(minutes / 10));
    setMinutesUnits(minutes % 10);
    setSecondDozens(Math.floor(seconds / 10));
    setSecondUnits(seconds % 10);
  };

  useEffect(() => {
    const updateTime = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(endTime).getTime() - now;

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      updateState(newDays, newHours, newMinutes, newSeconds);

      if (difference <= 0) {
        setCountdownRunning(false);
        clearInterval(updateTime);
        setDayDozens(0);
        setDayUnits(0);
        setHourDozens(0);
        setHoursUnits(0);
        setMinutesDozens(0);
        setMinutesUnits(0);
        setSecondDozens(0);
        setSecondUnits(0);
      } else {
        setCountdownRunning(true);
      }
    }, 1000);

    return () => {
      return clearInterval(updateTime);
    };
  }, [endTime]);

  const countdownEnable =
    dayDozens > 0 ||
    dayUnits > 0 ||
    hourDozens > 0 ||
    hoursUnits > 0 ||
    minutesDozens > 0 ||
    minutesUnits > 0 ||
    secondDozens > 0 ||
    secondUnits > 0;

  return {
    dayDozens,
    dayUnits,
    hourDozens,
    hoursUnits,
    minutesDozens,
    minutesUnits,
    secondDozens,
    secondUnits,
    countdownEnded: !countdownRunning,
    countdownEnable,
  };
};
