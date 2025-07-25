import { NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather'; // Import from the new lib file

// Removed WeatherData interface and getWeatherData function definition

// The GET handler now calls the imported function
export async function GET() {
  try {
    const data = await getWeatherData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in weather API route:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    // Determine appropriate status code based on error type if possible
    const status = errorMessage === 'API key is missing' ? 500 : 502; // 500 for config error, 502 for upstream error
    return NextResponse.json({ error: 'Error fetching weather data', details: errorMessage }, { status });
  }
} 