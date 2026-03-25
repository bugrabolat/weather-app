const API_KEY = "62be106c92a127a03c8aba3729c31457";

const getWeather = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,relativehumidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );
  
    const data = await response.json();
  
    const hourly24 = {
      time: data.hourly.time.slice(0, 24),
      temperature_2m: data.hourly.temperature_2m.slice(0, 24),
      weathercode: data.hourly.weathercode.slice(0, 24),
      relativehumidity_2m: data.hourly.relativehumidity_2m.slice(0, 24),
      precipitation: data.hourly.precipitation.slice(0, 24),
      wind_speed_10m: data.hourly.wind_speed_10m.slice(0, 24),
    };
  
    return {
      ...data,
      hourly: hourly24,
    };
  };

const getWeatherByLocation = async (lat: number, lon: number) => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,relativehumidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,weathercode&start_date=${startDate}&end_date=${endDate}&timezone=auto`);
    const data = await response.json();
    return data;
}
// const getReverseWeather = async (lat: number, lon: number) => {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/reverse?lat={41.0185}&lon={28.8836}&appid=${API_KEY}&units=metric&date=2026-03-03&exclude=hourly,daily`);
//     const data = await response.json();
//     return data;
// }
export { getWeather, getWeatherByLocation };

