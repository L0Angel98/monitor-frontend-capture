import { useEffect, useState } from "react";

const getDateCurrent = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

export default function useClock() {
  const [currentDate, setCurrentDate] = useState(getDateCurrent());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getDateCurrent());
    }, 1000);

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, []);

  return currentDate;
}
