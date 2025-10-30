import { useEffect, useState } from 'react';
import Card from './Card';

const tips = [
  'Use an SPF 30+ broad-spectrum sunscreen.',
  'Reapply sunscreen every 2 hours or after swimming or sweating.',
  'Drink water often—don’t wait until thirsty.',
  'Seek shade when appropriate. The sun’s rays are the strongest between 10 a.m. and 4 p.m. ',
  'Wear sunglasses and a wide-brim hat- our neck, face, and scalp are the most common areas to develop skin cancer!',
  'Skip tanning—no tan is a safe tan.',
  'Protect your skin when the UV Index is greater than 3.',
];

export default function SafetyTips() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval: number = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <h2>Stay Safe in the Sun</h2>
      <p className='text-sm'>{tips[index]}</p>
    </Card>
  );
}
