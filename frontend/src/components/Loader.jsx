import { Spinner } from 'react-bootstrap';

// Loading component
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '3rem',
        height: '3rem',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;
