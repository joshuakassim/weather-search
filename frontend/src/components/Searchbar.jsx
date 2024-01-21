import { Form, Button } from 'react-bootstrap';
import { useLazyGetWeatherQuery } from '../slices/apiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setWeatherData } from '../slices/weatherSlice';

// Search bar component
const Searchbar = () => {
  const [location, setLocation] = useState('');

  const [getWeather] = useLazyGetWeatherQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle search
  const submitHandler = async (e) => {
    e.preventDefault();
    // Chech if location was entered
    if (!location) {
      toast.error('Enter a city');
    } else {
      // Get weather data
      const response = await getWeather(location);
      if (response.isError) {
        toast.error(response?.error?.data?.message);
      } else {
        navigate(`/search/${location}`);
        dispatch(setWeatherData(response.data));
      }
    }
  };

  return (
    // Search bar
    <div className='mx-5 d-block'>
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type='text'
          placeholder='Search'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='me-2'
        />
        <Button type='submit' variant='outline-success'>
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Searchbar;
