'use client';

import { UVApiResponse } from '../types';
import { getMaxUVI } from '../utils/getMaxUVI';
import { getTodayUVData } from '../utils/getTodayForecast';
import { getUVColor } from '../utils/uvColor';
import uvProtectionAdvice from '../utils/uvProtectionAdvice';
import Card from './Card';

type UVDisplayProps = {
  uvData: UVApiResponse;
};
export default function UVDisplay({ uvData }: UVDisplayProps) {
  const todayForecast = getTodayUVData(uvData);
  const maxUVI = getMaxUVI(todayForecast);
  const currentUVI = uvData.now.uvi;
  // const currentUVI = 7;
  const { level, advice } = uvProtectionAdvice(currentUVI);
  const color = getUVColor(currentUVI);
  const percentage = Math.min((currentUVI / 11) * 100, 100);

  console.log({ todayForecast });

  return (
    <div>
      <Card>
        <h2 className='text-xl font-semibold mb-2'>UV Index</h2>

        <div className='flex items-center justify-between'>
          <p className='text-3xl font-bold' style={{ color }}>
            {currentUVI.toFixed(1)}
          </p>
          <p className='text-lg font-medium'>{level}</p>
        </div>

        {/* UV slider */}
        <div className='relative w-full mt-4'>
          {/* Gradient bar */}
          <div className='w-full h-4 rounded-full bg-[linear-gradient(to_right,#22c55e_0%,#facc15_25%,#fb923c_50%,#ef4444_75%,#9333ea_100%)]'></div>

          {/* Dot indicator */}
          <div
            className='absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out'
            style={{
              left: `${percentage}%`,
            }}
          >
            <div className='w-5 h-5 rounded-full border-2 border-white shadow-md'></div>
          </div>
        </div>

        <p className='text-sm text-gray-700 mt-3'>{advice}</p>
        <p className='mt-2 text-gray-500'>Max Today: {maxUVI?.uvi ?? '—'}</p>
      </Card>
    </div>
  );
}
