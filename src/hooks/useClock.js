import {useEffect, useState} from 'react';

function formatDate(date) {
  if (!date) return '';
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

function useClock() {

  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      // get current date
      const now = new Date();
      const newTimeString = formatDate(now);
      // update state
      setTimeString(newTimeString);
    }, 1000);

    return () => {
      // cleanup
      clearInterval(clockInterval);
    };
  }, []);

  return { timeString };
}

export default useClock;