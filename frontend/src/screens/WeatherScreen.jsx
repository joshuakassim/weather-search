import { useSelector } from 'react-redux';
import ForecastCard from '../components/ForecastCard';
import { CardGroup } from 'react-bootstrap';
import ForecastChart from '../components/ForecastChart';

// Displays weather data for the searched location
const WeatherScreen = () => {
  const { weatherData } = useSelector((state) => state.weatherData);

  return (
    <div>
      <h1 className='mb-3'>{weatherData.location.name}</h1>

      <CardGroup className='mb-5'>
        {weatherData.forecast.forecastday.map((row, index) => (
          <ForecastCard key={index} data={row} />
        ))}
      </CardGroup>

      <ForecastChart
        hourlyData={weatherData.forecast.forecastday[0].hour}
        id={'searchChart'}
      />
    </div>
  );
};

export default WeatherScreen;
