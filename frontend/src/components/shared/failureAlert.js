import Alert from "react-bootstrap/Alert";

const FailureAlert = (varient , errorMessage) => {
  return (
    <>
      <Alert variant={varient} >
        {errorMessage}
      </Alert>
    </>
  );
}

export default FailureAlert;
