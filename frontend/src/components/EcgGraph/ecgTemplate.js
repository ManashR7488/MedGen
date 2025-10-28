// ecgTemplate.js
export const generateECGTemplate = (samplesPerBeat = 50) => {
  const template = [];
  for (let i = 0; i < samplesPerBeat; i++) {
    const t = i / samplesPerBeat;

    // R‑peak: positive Gaussian centered at t=0.2
    const rPeak =  Math.exp(-Math.pow((t - 0.2) / 0.03, 2)) * 1.0;

    // P‑wave: small negative bump before R, centered at t=0.1
    const pWave = -Math.exp(-Math.pow((t - 0.1) / 0.02, 2)) * 0.2;

    // T‑wave: small negative bump after R, centered at t=0.6
    const tWave = -Math.exp(-Math.pow((t - 0.6) / 0.05, 2)) * 0.3;

    // Baseline wander: tiny sine
    const baseline = Math.sin(2 * Math.PI * t * 2) * 0.02;

    // Combine, then scale to amplitude ±100
    const value = (rPeak + pWave + tWave + baseline) * 100;
    template.push(value);
  }
  return template;
};
