import { getWeatherByLocation } from "@/services/weather";
import { useEffect, useState } from "react";

export const useLocationWeather = (lat?: number, lon?: number): any | null => {
  const [weather, setWeather] = useState<any | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    getWeatherByLocation(lat, lon).then((data: any) => {
      setWeather(data);
    });
  }, [lat, lon]);

  return weather;
};