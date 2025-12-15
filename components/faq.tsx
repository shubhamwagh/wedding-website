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
    q: `What time should I arrive?`,
    a: `Please arrive by 3rd Jan 10am for the ceremony`,
  },
  {
    q: `What is the dress code?`,
    a: (
      <>
        Anything that makes you feel fabulous! But dress to impress :D
        <ul className="list-disc pl-5 mt-2">
          <li>Engagement: Ethnic Wear</li>
          <li>Haldi: Shades of Yellow / Orange Ethnics</li>
          <li>Wedding: Traditional White / Pastel</li>
          <li>Reception: Western wear, just glam it up!</li>
        </ul>
      </>
    ),
  },
  {
    q: `What kind of shoes should/shouldn't I wear?`,
    a: `Only those that let you fully enjoy the celebrations!`,
  },
  {
    q: `Will the wedding be held indoors or outdoors?`,
    a: `The engagement, haldi and wedding ceremony will all take place
        outdoors at Tarang Farm House.`,
  },
  {
    q: `Is parking available at the wedding venue?`,
    a: `Limited street parking is available.`,
  },
  {
    q: `When should I RSVP by?`,
    a: `Please RSVP by December 31st 2025`,
  },
];
