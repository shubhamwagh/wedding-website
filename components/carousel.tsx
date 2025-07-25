'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Carousel() {
  const itemCount = 9;
  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    const randomDegrees = Array.from({ length: itemCount }, () => Math.floor(Math.random() * 21) - 10);
    setRotations(randomDegrees);
  }, []);

  const renderList = (loopIndex: number) => (
    <ul
      key={loopIndex}
      className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_li]:mx-12"
      aria-hidden={loopIndex === 1}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <li key={`item-${loopIndex}-${index}`}>
          <div
            className="bg-white dark:bg-neutral-100 border border-gray-300 dark:border-gray-400 rounded-md shadow-lg dark:shadow-black/30 overflow-visible flex flex-col items-center transition-transform"
            style={{
              transform: rotations[index] !== undefined ? `rotate(${rotations[index]}deg)` : 'none',
              width: 350,
              padding: '12px 12px 24px 12px',
              transformOrigin: 'center center',
            }}
          >
            <div className="w-full h-auto">
              <Image
                src={`/carousel/frame-${index + 1}.jpg`}
                width={180}
                height={250}
                alt=""
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="my-12 inline-flex w-full flex-nowrap" style={{ overflow: 'visible' }}>
      {renderList(0)}
      {renderList(1)}
    </div>
  );
}
