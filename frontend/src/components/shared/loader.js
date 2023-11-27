import {Spinner} from 'react-bootstrap';

export const LoaderAnimation = () => {
  console.log("working")
  return (
    <Spinner animation="border" role="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

