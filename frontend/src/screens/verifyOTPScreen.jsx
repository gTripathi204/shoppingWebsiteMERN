import { Container, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LoaderAnimation } from "../components/shared/loader";
import { HomeScreen } from "./homeScreen";
import axios from "axios";

const VerifyOTP = () => {
  let [OTP, setOTP] = useState("");
  const registration = useSelector((state) => state.registration);
  const { registrationData } = registration;

  let [data, setData] = useState("");

  const submitHandler = async (e) => {
    const x = registrationData.token;
    console.log(x);

    axios.defaults.headers.common["Authorization"] = `Bearer ${x}`;
    e.preventDefault();
    

    let data = await axios.post("http://localhost:8000/verifyOTP",{"OTP":OTP});
    setData(data.data);
  };

  const history = useNavigate() ;
  function OTPConfirmhardler() {
    setTimeout(() => {
      window.location.replace("/login")
    }, 1000);
  }


  return (
    <Container style={{ width: "30%", marginTop: "2rem" }}>
      {data === "Wrong OTP" ? (
        <Alert key="warning" variant="warning">
          {data}
        </Alert>
      ) : data === "" ? (
        <></>
      ) : (
        <Alert key="primary" variant="primary">
          `You are Successfully registered  <Alert.Link href="/login">Login to continue shopping {OTPConfirmhardler()}</Alert.Link>`
        </Alert>
        
      )}
      <h2 style={{ margin: "1rem auto " }}>verify OTP </h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="OTP">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            type="OTP"
            placeholder="Please Enter OTP sent to your Email"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Please don't share your OTP with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          verify
        </Button>
      </Form>
    </Container>
  );
};

export default VerifyOTP;
