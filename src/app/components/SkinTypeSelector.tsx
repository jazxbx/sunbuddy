import { SafeExposureTime, SkinType } from '../types';

interface SkinTypeSelectorProps {
  skinType: SkinType;
  setSkinType: (type: SkinType) => void;
  safeExposureTime: SafeExposureTime;
}

export function SkinTypeSelector({
  skinType,
  setSkinType,
  safeExposureTime,
}: SkinTypeSelectorProps) {
  const safeTime = safeExposureTime[`st${skinType}`];

  const convertMinstoHrsMins = (safeTime: number) => {
    if (safeTime < 60) {
      return `${safeTime}m`;
    }
    const h = Math.floor(safeTime / 60);
    const m = safeTime % 60;

    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  };

  return (
    <div className='flex flex-col gap-3 items-center'>
      <label className='font-semibold'>Select your skin type:</label>
      <select
        value={skinType}
        onChange={(e) => setSkinType(Number(e.target.value) as SkinType)}
        className='border p-2 rounded w-full bg-white mt-2 text-black'
      >
        <option value={1}>Skin Type 1 (Very fair, always burns)</option>
        <option value={2}>Skin Type 2 (Fair, usually burns)</option>
        <option value={3}>Skin Type 3 (Medium, sometimes burns)</option>
        <option value={4}>Skin Type 4 (Olive, rarely burns)</option>
        <option value={5}>Skin Type 5 (Brown, very rarely burns)</option>
        <option value={6}>Skin Type 6 (Dark brown, never burns)</option>
      </select>

      <p className='my-2 text-xl font-semibold'>Safe Exposure:</p>
      <p className='font-bold text-3xl'>
        {safeTime ? convertMinstoHrsMins(safeTime) : 'N/A'}
      </p>
    </div>
  );
}
