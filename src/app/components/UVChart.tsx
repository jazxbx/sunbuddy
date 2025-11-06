'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getUVColor } from '../utils/uvColor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ForecastItem = {
  time: string;
  uvi: number;
};

export default function UVChart({
  todayForecast,
}: {
  todayForecast: ForecastItem[];
}) {
  //format time from iso to hour:min
  //charts js expects labels
  const formattedTime = todayForecast.map((item) => {
    const date = new Date(item.time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  // UVI values
  const uvValues = todayForecast.map((item) => item.uvi);

  //line colors

  const data = {
    labels: formattedTime,
    datasets: [
      {
        label: 'UV Index', //x-axis
        data: uvValues, //y-axis
        borderColor: '#a7a7a7', //grey
        backgroundColor: uvValues.map((uv) => getUVColor(uv)),
        tension: 0,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'UV Index' },
      },
      x: {
        title: { display: true, text: 'Time (Local)' },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Today’s UV Index Forecast' },
    },
  };

  return (
    <div className='w-full h-64 md:h-80 mt-5'>
      <Line data={data} options={options} />
    </div>
  );
}
