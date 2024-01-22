import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import { CardGroup, Col, Container, Row } from 'react-bootstrap';
import ForecastCard from '../components/ForecastCard';
import ForecastChart from '../components/ForecastChart';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useLazyGetWeatherQuery } from '../slices/apiSlice';
import Loader from '../components/Loader';

// Displays home screen
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);

  const [getWeather] = useLazyGetWeatherQuery();

  // Get weather data on mount
  useEffect(() => {
    if (userInfo) {
      if (userInfo.location) {
        const fetchWeather = async () => {
          // if (userInfo.location) {
          const response = await getWeather(userInfo.location);
          if (response.isError) {
            toast.error(response?.error?.data?.message);
          } else {
            setData(response.data);
          }
          // }
        };
        fetchWeather();
      }
    }
  }, []);

  return (
    <>
      {/* Check if user is logged in */}
      {userInfo ? (
        // Check if user has a set location
        userInfo.location ? (
          // Check if there is weather data
          data ? (
            // Display weather data
            <div>
              <h1 className='mb-3'>{data.location.name}</h1>
              <CardGroup className='mb-5'>
                {data.forecast.forecastday.map((row, index) => (
                  <ForecastCard key={index} data={row} />
                ))}
              </CardGroup>

              <ForecastChart
                hourlyData={data.forecast.forecastday[0].hour}
                id={'homeChart'}
              />
            </div>
          ) : (
            // Display loader if there is no weather data yet
            <Loader />
          )
        ) : (
          // Display start instructions if user does not have a set location
          <Container>
            <Row className='justify-content-md-center mt-5'>
              <Col xs={12} md={6} className='card p-5'>
                <h4 className='text-center'>
                  To get started, you need to confirm your location by going to
                  your profile and entering your city of residence.
                </h4>
              </Col>
            </Row>
          </Container>
        )
      ) : (
        // Diplay Hero (intro) if user is logged out
        <Hero />
      )}
    </>
  );
};

export default HomeScreen;
