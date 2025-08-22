'use client';
import { useState } from 'react';
// FIXME: uv decimal rounding/ truncation??
//TODO: add safe exposure time

import { UVData } from '../types';
import { SkinTypeSelector } from './SkinTypeSelector';

export default function UVDisplay({ uv, uv_max }: UVData) {
  const [skinType, setSkinType] = useState<SkinType>(3);

  function getUVLevel(uv: number) {
    if (uv <= 2)
      return {
        label: 'Low',
        text: 'text-green-600',
        bg: 'bg-green-100',
        message: 'Minimal risk. Sunglasses optional.',
      };
    if (uv <= 5)
      return {
        label: 'Moderate',
        text: 'text-yellow-600',
        bg: 'bg-yellow-100',
        message: 'Some risk. Use SPF 15+ if outdoors.',
      };
    if (uv <= 7)
      return {
        label: 'High',
        text: 'text-orange-600',
        bg: 'bg-orange-100',
        message: 'High risk. Wear sunscreen, hat, and sunglasses.',
      };
    if (uv <= 10)
      return {
        label: 'Very High',
        text: 'text-red-600',
        bg: 'bg-red-100',
        message: 'Very high risk. Limit midday sun, use strong SPF.',
      };
    return {
      label: 'Extreme',
      text: 'text-purple-700',
      bg: 'bg-purple-100',
      message: 'Extreme risk. Avoid sun, cover up, and use SPF 50+.',
    };
  }

  const { label, text, bg, message } = getUVLevel(uv);

  return (
    <div
      className={`flex flex-col items-center p-4 gap-2 rounded-xl shadow-md ${bg}`}
    >
      <p className='item'>uv index</p>
      <h1 className={`text-5xl font-extrabold ${text}`}>{uv}</h1>
      <h2 className='text-2xl font-semibold'>{label}</h2>
      <h3 className='text-sm'>{message}</h3>
      <p>Max UV Today: {uv_max}</p>

      <SkinTypeSelector skinType={skinType} setSkinType={setSkinType} />
    </div>
  );
}
