export function getMaxUVI(history?: { time: string; uvi: number }[]) {
  if (!history?.length) return null;
  return history.reduce((prev, curr) => (prev.uvi > curr.uvi ? prev : curr));
}
