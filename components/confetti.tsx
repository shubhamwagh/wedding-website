'use client';

import Realistic from 'react-canvas-confetti/dist/presets/realistic';

export default function Confetti() {
  return <Realistic autorun={{ speed: 0.3, duration: 5000 }} />;
} 