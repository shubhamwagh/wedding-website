'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FAQ from '@/components/faq';
import Heading from '@/components/heading';
import Carousel from '@/components/carousel';
import { RSVPForm } from '@/components/rsvp';
import Divider from '@/components/divider';
import AnimatedFlower from '@/components/flower';
import Hero from '@/components/hero';
import StayLink from '@/components/stay-link';
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
            title="Silpa & Shubam's Wedding"
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
            Nicole Gasser and Matt Atkins first crossed paths in 2016 at
            McGillians in Philadelphia during Nicole's sister's birthday party.
            Matt was immediately taken with Nicole's charm. They exchanged
            pleasantries and parted ways that night. However, the following
            week, Matt asked Nicole out to lunch near her school in Northeast
            PA.
          </p>
          <p className="text-xl xl:text-3xl">
            They immediately clicked, leading Nicole to visit Colorado for a
            weekend adventure hosted by Matt. Eventually, Matt moved into a
            four-floor walk-up in Philly, a place that continues to hold a
            special place in their hearts.
          </p>
        </div>
        <Carousel />
      </section>
      <section id="schedule" className="relative px-5 py-12">
        <AnimatedFlower className="absolute -top-28 left-1/2 mx-auto mb-6 mt-20 -translate-x-96 rotate-180" />
        <div className="absolute right-0 top-0 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <div className="absolute left-0 top-1/2 -z-10 h-48 w-48 -translate-y-1/2 rounded-full bg-gold blur-[80px]" />
        <Heading>The Wedding Day</Heading>
        <div className="ml-6 mt-20 grid place-items-center gap-12 xl:ml-auto xl:gap-40">
          <ScheduleBox
            title="Welcome to Lilah"
            time="Arrive by 5:30 pm"
            variant={1}
          >
            Entry to Lilah begins at 5 pm. Street parking is available in
            Fishtown if you can find it. There will also be a shuttle bus from
            the hotel.
          </ScheduleBox>
          <ScheduleBox
            title="The Ceremony"
            time="6:00 pm - 6:30 pm"
            variant={2}
          >
            Make your way over to the ceremony at Lilah for the I Do's part of
            the night.
          </ScheduleBox>
          <ScheduleBox
            title="Coctail Hour"
            time="6:00 pm - 6:30 pm"
            variant={3}
          >
            After the ceremony, head to the bar area for cocktail hour. Both
            alcoholic and non-alcoholic drinks will be served, along with a
            passed appetizers. Enjoy a drink and catch up with friends and
            family.
          </ScheduleBox>
          <ScheduleBox title="Reception" time="6:00 pm - 6:30 pm" variant={4}>
            Join us for the main event! Head through the large doors to our
            reception, where we'll continue celebrating with dinner, drinks, and
            dancing. We're excited to party with everyone!
          </ScheduleBox>
          <ScheduleBox title="After Party" time="6:00 - 6:30 pm" variant={5}>
            After the reception, we'll be heading out in Fishtown for a low-key,
            nothing fancy after party featuring a cash bar. Let's keep the party
            going!
          </ScheduleBox>
        </div>
        <div className="relative mt-28 flex items-center justify-center gap-8 py-8 text-center before:absolute before:h-full before:w-32 before:border-y-4 before:border-gold lg:text-left">
          <Image
            src="/museum.svg"
            width={248}
            height={392}
            alt=""
            className="hidden xl:block"
          />
          <div className="max-w-sm">
            <h4 className="text-xl font-bold">After Party</h4>
            <span className="mb-4 block text-sm font-bold text-gold">
              Friday May 31st, at 6:00 pm
            </span>
            <p className="mb-4">
              Please join us at Museum of the American Revolution, 101 South
              Third Street, Philadelphia, PA
            </p>
            <SaveToCalendar
              title="After Party"
              description="Join us at Museum of the American Revolution, 101 South
              Third Street, Philadelphia, PA"
              location="Museum of the American Revolution, 101 South
              Third Street, Philadelphia, PA"
              start="May 31, 2024 18:00"
            />
          </div>
        </div>
      </section>
      <Divider />
      <section id="stay" className="relative px-5 py-16">
        <AnimatedFlower className="absolute -top-28 right-12 mx-auto mb-6 mt-20 rotate-180" />
        <div className="absolute left-1/2 top-0 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-gold blur-[100px]" />
        <Heading>Your Stay in Philadelphia</Heading>
        <p className="mx-auto max-w-md text-center">
          Turn your weekend into an adventure! Explore nearby locations and our
          favorite spots in Philly.
        </p>
        <div className="mx-auto mt-20 grid max-w-7xl place-items-center gap-12">
          <StayLink
            title="Lodging"
            href={config.links.lodging}
            label="Book a Room"
          >
            There will be shuttles with limited seating available from the
            Hilton Penns Landing & Kimpton Monico to the event and back.
          </StayLink>
          <StayLink
            title="Eat & Drink"
            href={config.links.eatdrink}
            label="Open Map"
            align="middle"
          >
            Wm. Mulherin's Sons, Lark, Middle Child, LMNO, Gilda, Johnny
            Brenda's, International Bar, Martha, Two Robbers, Bok Ba
          </StayLink>
          <StayLink
            title="Things To Do"
            href={config.links.thingstodo}
            label="Open Map"
            align="right"
          >
            Philadelphia Museum of Art, Franklin Institute, Schuylkill River
            Trail, The Barnes Foundation, Wissahickon, Eastern State
            Penitentiary
          </StayLink>
        </div>
        <Image
          src="/city.svg"
          width={692}
          height={200}
          alt=""
          className="-bottom-8 left-0 xl:absolute"
        />
      </section>
      <Divider />
      <section id="faq" className="relative px-5 py-12">
        <div className="absolute left-0 top-40 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <Heading>Frequently Asked Questions</Heading>
        <FAQ />
      </section>
      {/* <section
        id="registry"
        className="flex flex-col items-center justify-center px-5 py-12"
      >
        <Heading>Our Registry</Heading>
        <p className="mb-6 max-w-md text-center">
          You know what they say — your presence is a gift! However, if you want
          to give us a present, we're registered at Zola.
        </p>
        <Button variant="default" asChild>
          <a
            href={config.links.registry}
            target="_blank"
            rel="noopener noreferrer"
          >
            Give a Gift
          </a>
        </Button>
      </section> */}
      <Divider />
      <section id="rsvp" className="relative px-5 pb-32">
        <AnimatedFlower className="absolute -top-28 left-10 mx-auto mb-6 mt-20 lg:left-1/2 lg:-translate-x-96" />
        <div className="absolute bottom-0 right-0 -z-10 h-48 w-48 rounded-full bg-gold blur-[80px]" />
        <h3 className="text-center text-xl font-bold text-gold">RSVP</h3>
        <Heading>You're Invited!</Heading>
        <RSVPForm />
      </section>
    </div>
  );
} 