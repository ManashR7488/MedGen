import React, { useEffect, useRef } from 'react';
import { SmoothieChart, TimeSeries } from 'smoothie';
import { generateECGTemplate } from './ecgTemplate';

const ECGGraph = ({ heartData }) => {
  const canvasRef = useRef(null);
  const ecgSeries = useRef(new TimeSeries());
  const beatTimer = useRef(null);
  const template = useRef(generateECGTemplate(50));
  const sampleIndex = useRef(0);

  // Initialize chart with ±100 center
  useEffect(() => {
    const chart = new SmoothieChart({
      millisPerPixel: 5,
      interpolation: 'linear',
      grid: {
        strokeStyle: '#222',
        lineWidth: 1,
        millisPerLine: 200,
        verticalSections: 4,
      },
      labels: { fillStyle: '#0f0' },
      minValue: -100,
      maxValue: +100,
    });

    chart.addTimeSeries(ecgSeries.current, {
      strokeStyle: 'lime',
      lineWidth: 2,
    });

    chart.streamTo(canvasRef.current, 50);
    return () => chart.stop();
  }, []);

  // Drive beats or flatline
  useEffect(() => {
    if (beatTimer.current) clearInterval(beatTimer.current);
    const bpm = heartData.length ? heartData[heartData.length - 1] : 0;

    // Flat mid-line when BPM = 0
    if (!bpm) {
      beatTimer.current = setInterval(() => {
        ecgSeries.current.append(Date.now(), 0);
      }, 50);
      return () => clearInterval(beatTimer.current);
    }

    // Otherwise schedule synthetic beat
    const intervalMs = 60000 / bpm;
    sampleIndex.current = 0;
    const sampleRate = intervalMs / template.current.length;

    beatTimer.current = setInterval(() => {
      const now = Date.now();
      const raw = template.current[sampleIndex.current];
      ecgSeries.current.append(now, raw);
      sampleIndex.current = (sampleIndex.current + 1) % template.current.length;
    }, sampleRate);

    return () => clearInterval(beatTimer.current);
  }, [heartData]);

  return (
    <div className="bg-black p-4 rounded-xl border border-base-300 w-fit">
      <canvas ref={canvasRef} width={"1000px"} height={200} className='w-full' />
    </div>
  );
};

export default ECGGraph;
