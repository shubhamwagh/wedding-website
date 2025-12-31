import HomePageClient from '@/components/home-page-client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FAQ from '@/components/faq';
import Heading from '@/components/heading';
import Carousel from '@/components/carousel';
import { RSVPForm } from '@/components/rsvp';
import Divider from '@/components/divider';
import AnimatedFlower from '@/components/flower';
import Hero from '@/components/hero';
import ScheduleBox from '@/components/schedule-box';
import { config } from '@/config';
import SaveToCalendar from '@/components/save-to-calendar';
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Confetti from '@/components/confetti';
import { getWeatherData, WeatherData } from '@/lib/weather'; // Import from the new lib file

// Keep the interface definition or import if needed by HomePageClient, 
// but it's also exported from the route now.
// interface WeatherData { ... }

export default async function Home() {
  let weatherData: WeatherData | null = null;
  try {
    // Call the imported function directly
    // Revalidation is handled by Next.js page-level caching/revalidation, not fetch options
    weatherData = await getWeatherData(); 
  } catch (error) {
    console.error("Error getting weather data for page:", error);
    // weatherData remains null, the client component will handle this
  }

  // Render the Client Component, passing the fetched data as props
  return <HomePageClient weatherData={weatherData} />;
}
