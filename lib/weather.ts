export interface WeatherData {
  current: {
    temp: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
}

export async function getWeatherData(): Promise<WeatherData> {
  const lat = 11.158054;
  const lon = 75.841601;
  const apiKey = process.env.WEATHERMAP_API_KEY;

  if (!apiKey) {
    console.error("WeatherAPI key is missing.");
    throw new Error('API key is missing');
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Failed to fetch weather data from WeatherAPI: ${res.status} ${res.statusText}`, errorText);
    throw new Error(`Failed to fetch weather data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return {
    current: {
      temp: data.current.temp_c,
      weather: [
        {
          description: data.current.condition.text,
          icon: `https:${data.current.condition.icon}`,
        },
      ],
    },
  };
}