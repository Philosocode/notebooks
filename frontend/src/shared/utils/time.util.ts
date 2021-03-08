// https://stackoverflow.com/a/21294619/9970553
export function msToMMSS(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000);
  
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
}