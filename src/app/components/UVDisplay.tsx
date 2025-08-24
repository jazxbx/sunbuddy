'use client';
import { useState } from 'react';

import { UVData, SkinType } from '../types';
import { SkinTypeSelector } from './SkinTypeSelector';

export default function UVDisplay({ uv, uv_max, safe_exposure_time }: UVData) {
  const [skinType, setSkinType] = useState<SkinType>(3);

  function getUVLevel(uv: number) {
    if (uv <= 2)
      return {
        label: 'Low',
        text: 'text-green-700',
        bg: 'bg-lime-100',
        message: 'Minimal risk. Sunglasses optional.',
      };
    if (uv <= 5)
      return {
        label: 'Moderate',
        text: 'text-yellow-500',
        bg: 'bg-amber-100',
        message: 'Some risk. Use SPF 15+ if outdoors.',
      };
    if (uv <= 7)
      return {
        label: 'High',
        text: 'text-orange-600',
        bg: 'bg-orange-200',
        message: 'High risk. Wear sunscreen, hat, and sunglasses.',
      };
    if (uv <= 10)
      return {
        label: 'Very High',
        text: 'text-red-50',
        bg: 'bg-red-700',
        message: 'Very high risk. Limit midday sun, use strong SPF.',
      };
    return {
      label: 'Extreme',
      text: 'text-indigo-200',
      bg: 'bg-violet-800',
      message: 'Extreme risk. Avoid sun, cover up, and use SPF 50+.',
    };
  }

  const { label, text, bg, message } = getUVLevel(uv);

  return (
    <div
      className={`flex flex-col items-center py-4 px-3 md:py-6 gap-3 rounded-xl border-2 border-black ${bg} ${text}`}
    >
      <div className='text-2xl font-bold'>UV INDEX</div>
      <h1 className={`text-7xl font-extrabold ${text}`}>{uv.toFixed(1)}</h1>
      <h2 className='text-2xl font-bold'>{label}</h2>
      <h3 className='text-lg'>{message}</h3>
      <p className='text-2xl font-bold'>Max UV Today: {uv_max.toFixed(1)}</p>

      <SkinTypeSelector
        skinType={skinType}
        setSkinType={setSkinType}
        safeExposureTime={safe_exposure_time}
      />
    </div>
  );
}
