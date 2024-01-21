import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register required features
Chart.register(...registerables);

// Define x-axis labels
const labels = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

// Chart for diplaying hourly break down of precipitation, temperature and wind speed
const ForecastChart = ({ hourlyData }, { id }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: hourlyData.map((hour) => hour.precip_mm),
        options: { responsive: true, maintainAspectRatio: false },
      },
      {
        label: 'Temperature (°C)',
        data: hourlyData.map((hour) => hour.temp_c),
        options: { responsive: true, maintainAspectRatio: false },
      },
      {
        label: 'Wind Speed (kph)',
        data: hourlyData.map((hour) => hour.wind_kph),
        options: { responsive: true, maintainAspectRatio: false },
      },
    ],
  };
  return (
    <div>
      <h5>Todays hourly break down</h5>
      {/* Line chart */}
      <Line style={{ width: '100%', height: '100%' }} data={data} id={id} />
    </div>
  );
};

export default ForecastChart;
