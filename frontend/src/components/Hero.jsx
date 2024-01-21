import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Introduction component
const Hero = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Weather Search</h1>
          <div className='d-flex'>
            <LinkContainer to='/login'>
              <Button className='me-3' variant='primary'>
                Login
              </Button>
            </LinkContainer>

            <LinkContainer to='/register'>
              <Button variant='secondary'>Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
