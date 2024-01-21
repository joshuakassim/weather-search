import { Card, Col, Row } from 'react-bootstrap';

// Displays card with a summary of daily data
const ForecastCard = ({ data }, { key }) => {
  return (
    <Card
      key={key}
      style={{ background: '#DDFFFF' }}
      border='secondary'
      className='mx-3'
    >
      <Card.Img variant='top' src={data.day.condition.icon} />
      <Card.Body>
        <Card.Title>
          <p className='h3'>{data.date}</p>
          <p className='h3'>{data.day.condition.text}</p>
        </Card.Title>
        <Card.Text>
          <Row>
            <Col className='h5'>
              Max: <b>{data.day.maxtemp_c}°C</b>
            </Col>
            <Col className='text-muted h5'>Min: {data.day.mintemp_c}°C</Col>
          </Row>
          <p className='h5'>Average: {data.day.avgtemp_c}°C</p>
          <p className='h5'>Precipitation: {data.day.totalprecip_mm}mm</p>
          <Row className='mt-3'>
            <Col>
              <p className='h6 text-center'>Sunrise</p>
            </Col>
            <Col>
              <p className='h6 text-center'>Sunset</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className='h6 text-center'>{data.astro.sunrise}</p>
            </Col>
            <Col>
              <p className='h6 text-center'>{data.astro.sunset}</p>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ForecastCard;
