export type SkinType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// Minimal Erythemal Dose (MED) in J/m² for unprotected skin.
// This is the energy dose required to cause a minimal sunburn.
const MED_VALUES: Record<SkinType, number> = {
  I: 200, // Very fair
  II: 250, // Fair
  III: 350, // Fair to Light Brown
  IV: 500, // Moderate Brown
  V: 700, // Dark Brown
  VI: 1000, // Very Dark
};

export function getSafeExposureTime(uvi: number, skinType: SkinType): number {
  // 1. Input Validation and Defaults
  const safeUVI = uvi > 0 && !isNaN(uvi) ? uvi : 0;

  // Use Type III (350 J/m²) as a fallback if skinType is somehow missing or invalid
  const med = MED_VALUES[skinType] ?? 350;

  // 2. Core Calculation

  // Formula: Time (minutes) = (MED * SPF) / (UVI * 1.5)
  // 1.5 is the conversion factor for J/m² per minute at UVI=1.
  const conversionFactor = 1.5;

  const minutes = med / (safeUVI * conversionFactor);

  // 3. Output Clamping
  // Clamp at 600 minutes (10 hours) as any value beyond this is practically irrelevant for sun safety.
  return Math.round(Math.min(minutes, 600));
}
