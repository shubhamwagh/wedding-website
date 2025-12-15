'use client';

import Image from 'next/image';
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
import { WEDDING_TIMESTAMP } from '@/lib/constants';

// Define the type matching the data fetched in the server component
interface WeatherData {
  current: {
    temp: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
}

interface HomePageClientProps {
  weatherData: WeatherData | null;
}

export default function HomePageClient({ weatherData }: HomePageClientProps) {
  const today = new Date();
  const weddingDate = new Date(WEDDING_TIMESTAMP);

  const isWeddingDayOrElapsed = today >= weddingDate;
  return (
    <div role="main">
      {isWeddingDayOrElapsed && (
        <Realistic autorun={{ speed: 0.3, duration: 5000 }} />
      )}
      {isWeddingDayOrElapsed && <Confetti />}
      <Hero />
      <section className="relative px-5">
        <div className="absolute left-0 top-0 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="mb-2 text-2xl font-bold xl:text-4xl">
            Sunday, January 4, 2026
          </h2>
          <div className="mb-6 text-sm font-semibold leading-relaxed text-center">
            <p className="text-base xl:text-lg font-medium text-gold">
              📍 Tarang Farm House
            </p>
            <p>Kadalundy Road, near Mannur Toddy Shop</p>
            <p>Kozhikode, Kerala – 673328</p>
          </div>
          {weatherData && weatherData.current && weatherData.current.weather[0] && (
            <div className="mb-4 flex items-center gap-1 text-sm">
              <Image
                src={weatherData.current.weather[0].icon}
                alt={weatherData.current.weather[0].description}
                width={40}
                height={40}
                unoptimized
              />
              <span>
                Currently {Math.round(weatherData.current.temp)}°C and{" "}
                {weatherData.current.weather[0].description}
              </span>
            </div>
          )}
          <SaveToCalendar
            title="Shilpa & Shubam's Wedding"
            description="Join us at Tarang Farm House"
            location="Kadalundy Road, near Mannur Toddy Shop, Kozhikode, Kerala – 673328"
            start="January 4, 2026 11:30"
          />
        </div>
        <div className="flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.3993349666443!2d75.83902567598804!3d11.158039989014934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba650f277de6161%3A0x6a44af900c9278f!2sTarang%20Farm%20House!5e0!3m2!1sen!2suk!4v1753009279439!5m2!1sen!2suk"
            width="600"
            height="450"
            className="aspect-video h-auto w-full max-w-3xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <Divider />
      <section id="our-story" className="relative py-12">
        <AnimatedFlower className="absolute -top-48 right-10 mx-auto mb-6 mt-20 rotate-180" />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Heading>How it all began</Heading>
          <p className="mb-4 text-xl xl:text-3xl">
            It all began with a simple message - sincere, unassuming, and full of promise. From the very first conversation, it felt effortless. 
            With each laugh and each shared story, they discovered that together, they could truly be themselves and, in doing so, bring out the best in each other.
          </p>
          <p className="mb-4 text-xl xl:text-3xl">  
            Their first meeting in Oxford was meant to be a casual coffee, but time slipped away as they talked, laughed, and shared dreams. 
            It was a moment that felt natural, easy, and full of possibility, a glimpse of what their journey together could be. 
            Since then, their love has grown through long walks, late-night conversations, shared meals, and quiet moments that say more than words ever could. 
            Though they come from different worlds - Maharashtra and Kerala, their hearts have found a rhythm that encourages them to grow, laugh, and shine, each becoming a better version of themselves together. 
          </p>
          <p className="text-xl xl:text-3xl">
            Now, Shilpa and Shubham are ready to begin the next chapter of their story, surrounded by the people who mean the most to them, celebrating a love that feels effortless, inspiring, and endlessly true.
          </p>
        </div>
        <Carousel />
      </section>
      <section id="schedule" className="relative px-5 py-12">
        {/* Background glows */}
        <div className="absolute right-0 top-0 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <div className="absolute left-0 top-1/2 -z-10 h-48 w-48 -translate-y-1/2 rounded-full bg-gold blur-[80px]" />

        {/* Container for flower + heading */}
        <div className="relative w-max mx-auto mb-10">
          <AnimatedFlower className="absolute -top-20 left-1/2 -translate-x-1/6 rotate-180 w-20 h-20" />
          <Heading>Wedding Schedule</Heading>
        </div>
        <div className="ml-6 mt-20 grid place-items-center gap-12 xl:ml-auto xl:gap-40">
          <ScheduleBox
            title="Engagement Ceremony"
            time="Saturday January 3rd, morning at 10:30 AM"
            dresscode="Ethnic wear"
            location="Tarang Farm House Kozhikode, Kerala – 673328"
            variant={1}
          >
            Join us for the engagement ceremony on the morning of 3rd January.
          </ScheduleBox>

          <ScheduleBox
            title="Haldi Ceremony"
            time="Saturday January 3rd, evening at 5:00 PM"
            dresscode="Shades of yellow / orange"
            location="Tarang Farm House Kozhikode, Kerala – 673328"
            variant={2}
          >
            Celebrate the vibrant Haldi ceremony with us on the evening of 3rd January.
          </ScheduleBox>

          <ScheduleBox
            title="Wedding Ceremony"
            time="Sunday January 4th, morning at 10:30 AM"
            dresscode="Traditional white / pastel saree or kurta"
            location="Tarang Farm House Kozhikode, Kerala – 673328"
            variant={3}
          >
            We would be delighted to have you join us as we begin this new chapter together surrounded by family and friends.
          </ScheduleBox>

          <ScheduleBox
            title="Kozhikode Reception"
            dresscode="Suit up"
            time="Sunday January 4th, evening at 05:30 PM"
            location="S.K. Pottekkat Hall, Kozhikode, Kerala – 673004"
            variant={4}
          >
            Join us for a warm reception and an evening of joyful celebration with family and friends.
          </ScheduleBox>

          <ScheduleBox
            title="Nagpur Reception"
            time="Friday January 9th, evening at 07:00 PM"
            dresscode="Suit up"
            location="Tuli Imeprial, Nagpur, Maharashtra – 440010"
            variant={5}
          >
            Celebrate with us for an evening of joyful moments shared with family and friends.
          </ScheduleBox>
        </div>
      </section>

      <Divider /> 
      <section id="faq" className="relative px-5 py-12">
        <div className="absolute left-0 top-40 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <Heading>Frequently Asked Questions</Heading>
        <FAQ />
      </section> 
      <Divider />
      <section id="rsvp" className="relative px-5 pb-32">
        <AnimatedFlower className="absolute -top-28 left-10 mx-auto mb-6 mt-20 lg:left-1/2 lg:-translate-x-96" />
        <div className="absolute bottom-0 right-0 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <h3 className="text-center text-xl font-bold text-gold">RSVP</h3>
        <Heading>You're Invited!</Heading>
        <RSVPForm />
      </section>
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Shilpa & Shubham. All rights reserved.
      </footer> 
    </div>
  );
} 