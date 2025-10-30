'use client';

import { useState } from 'react';
import Card from './Card';
import { getSafeExposureTime } from '../utils/sunSafety';

export type SkinType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

interface SkinTypeSelectorProps {
  currentUVI: number;
}

const SKIN_INFO: Record<
  SkinType,
  { color: string; label: string; description: string }
> = {
  I: {
    color: '#ffeadf',
    label: 'Very pale, white fair skin (always burns, never tans)',
    description: 'Often has light eyes and red or blond hair.',
  },
  II: {
    color: '#f1d1ac',
    label: 'Fair skin (usually burns, tans minimally)',
    description: 'Typically light eyes, hair, and fair skin; burns easily.',
  },
  III: {
    color: '#d9ac7d',
    label: 'Light brown skin (sometimes mild burn, tans gradually)',
    description:
      'Medium complexions, light to dark brown hair, tans moderately.',
  },
  IV: {
    color: '#ae725b',
    label: 'Moderate brown skin (rarely burns, tans easily)',
    description: 'Olive or light brown skin; Mediterranean or Asian heritage.',
  },
  V: {
    color: '#6b3b2c',
    label: 'Dark brown skin (very rarely burns, tans very easily)',
    description:
      'Naturally darker skin tones, Middle Eastern or Latin heritage.',
  },
  VI: {
    color: '#3f2414',
    label: 'Very dark skin (never burns, deeply pigmented)',
    description: 'Deeply pigmented dark brown or black skin; rarely sunburns.',
  },
};

export default function SkinTypeSelector({
  currentUVI,
}: SkinTypeSelectorProps) {
  const [skinType, setSkinType] = useState<SkinType>('III');
  const safeTime = getSafeExposureTime(currentUVI, skinType);

  function formatMinstoTime(totalMins: number): string {
    if (!totalMins || totalMins <= 0) return '0 min';
    const hours = Math.floor(totalMins / 60);
    const minutes = Math.round(totalMins % 60);
    if (hours === 0) return `${minutes} min`;
    return `${hours}h ${minutes}m`;
  }

  return (
    <Card>
      <h2 className='text-xl font-semibold mb-2'>Soak Up the Sun, Safely</h2>
      <p className='text-gray-700'>
        Based on your skin type, here’s how long you can safely stay in the sun
        before burning.
      </p>
      {/* <p className='text-gray-600 text-sm mb-3'>
        Current UV Index: <strong>{currentUVI.toFixed(1)}</strong>
      </p> */}

      {/* Skin type buttons with hover info */}
      <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4 mt-4'>
        {(Object.keys(SKIN_INFO) as SkinType[]).map((type) => {
          const info = SKIN_INFO[type];
          return (
            <div key={type} className='relative group'>
              <button
                onClick={() => setSkinType(type)}
                className={`w-full h-16 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center`}
                style={{
                  backgroundColor: info.color,
                  borderColor:
                    skinType === type ? '#2563eb' : 'rgba(0,0,0,0.1)',
                }}
              >
                <span className='font-semibold'>{type}</span>
              </button>

              {/* Tooltip */}
              <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-44 bg-black text-white text-xs rounded-lg p-2 shadow-lg z-10'>
                <p className='font-bold mb-1'>{info.label}</p>
                <p>{info.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe exposure time */}
      <div className='text-center'>
        <>
          <p className='text-lg text-gray-800'>Safe exposure time:</p>
          <p className='text-3xl font-bold mt-1'>
            {formatMinstoTime(safeTime)}
          </p>
          <p className='text-xs text-gray-500 mt-2'>
            Approximate time before burn (without SPF). Wearing SPF 30 + is
            always recommended. Conditions like snow, water, and high altitude
            can increase UV exposure and reduce safe time.
          </p>
        </>
      </div>
    </Card>
  );
}
