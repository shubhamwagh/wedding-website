'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto mt-24 w-full max-w-2xl pl-6 xl:max-w-6xl"
    >
      {data.map(({ q, a }, index) => (
        <AccordionItem
          key={`item-${index}`}
          value={`item-${index}`}
          className="border-none hover:text-gray/80"
        >
          <AccordionTrigger className="text-left before:absolute before:-ml-4 before:-translate-x-full before:content-['❤︎'] hover:no-underline xl:text-center xl:text-2xl">
            {q}
          </AccordionTrigger>
          <AccordionContent className="xl:text-xl">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const data = [
  {
    q: `What is the dress code?`,
    a: `The dress code is cocktail attire.`,
  },
  {
    q: `Is parking available at the wedding venue?`,
    a: `Limited street parking is available. However, we recommend using
        the shuttle from the hotel or a rideshare service. Uber is widely
        available in the area.`,
  },
  {
    q: `Will there be a shuttle service to and from the event?`,
    a: `Yes, a shuttle will run between the Hilton Penn's Landing, the
        Kimpton Monaco in Old City, and the venue, returning at the end of
        the night.`,
  },
  {
    q: `Will the wedding be held indoors or outdoors?`,
    a: `The ceremony, cocktail hour, and reception will all take place
        indoors at Lilah.`,
  },
  {
    q: `Is Lilah accessible for wheelchairs?`,
    a: `Yes, it is fully accessible.`,
  },
  {
    q: `Tell me more about the After Party?`,
    a: `The After Party is optional for guests wanting to keep the party
        going. We plan to find a bar in Fishtown that will take us in.
        Please note, it will be a cash bar, and no shuttle service will be
        provided back to the hotel. Guests should prepared to ride share
        back to their accommodations.`,
  },
  {
    q: `When should I RSVP by?`,
    a: `Please RSVP by May 1st 2024`,
  },
  {
    q: `Can I take photos?`,
    a: `We have an amazing photographer who will cover the event, allowing
        you to fully enjoy the occasion. We'll share the photos with
        everyone afterwards! If you choose to take pictures, please avoid
        doing so where our photographer is working, and refrain from using
        flash. Thank you!`,
  },
];
