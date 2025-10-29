export default function uvProtectionAdvice(uvi: number) {
  if (uvi < 0) return { level: 'N/A', advice: 'No data available' };
  if (uvi < 3)
    return {
      level: 'Low',
      advice: 'No protection needed. You can safely stay outside!',
    };

  if (uvi < 6)
    return {
      level: 'Moderate',
      advice:
        'Protection Required. Wear sunglasses and SPF 30+ sunscreen if outside for long.',
    };

  if (uvi < 8)
    return {
      level: 'High',
      advice:
        'Protection Essential. Use SPF 30+, wear a hat, and limit midday exposure. (10 AM - 4PM)',
    };

  if (uvi < 11)
    return {
      level: 'Very High',
      advice:
        'Extra protection needed! Apply SPF 50+, wear long sleeves, and seek shade during midday. (10 AM- 4PM',
    };

  return {
    level: 'Extreme',
    advice:
      'Avoid the sun if possible. Apply SPF 50+, cover skin, and stay in shade.',
  };
}
