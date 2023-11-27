import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LoaderAnimation } from "../components/shared/loader";
import {userSingnUpLoading , userSingnUp } from "../reducers/userRegisterreducer" ;
import validator from "validator";
import axios from "axios";




const SignUPScreen = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [rePassword, setRePassword] = useState("");
  let [samePass, setSamePass] = useState(true);
  let [validEmail, setValidEmail] = useState(true);

  const location = useLocation();
  const history = useNavigate();

  const dispatch = useDispatch();
  
  const registration = useSelector((state) => state.registration);
  let {  registerationData , userRegistrationLoading } = registration;


  useEffect(() => {
    validateEmailFun();
    Object.is(password, rePassword) ? setSamePass(true) : setSamePass(false);
    if (registerationData) {
      history("/verifyOTP");
    }
  }, [history, registerationData, redirect, rePassword, email]);

  const submitHandler = async (e) => {
    if (samePass && validEmail) {
      e.preventDefault();
      dispatch(userSingnUpLoading(true)) ;
      const { data } = await axios.post("http://localhost:8000/register", { name , email , password , rePassword });
      if(data){
        dispatch(userSingnUpLoading(false))
        dispatch(userSingnUp(data)) ;
      }
      history("/verifyOTP");
    } else {
      e.preventDefault();
    }
  };

  function validateEmailFun() {
    if (email === "") {
      console.log("Valid");
      setValidEmail(true);
    } else {
      if (validator.isEmail(email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  }

  const EmailSettingFunction = (e) => {
    setEmail(e.target.value);
  };

  const ReEnterPassFun = async (e) => {
    await setRePassword(e.target.value);
  };

  return (
    <Container style={{ width: "30%", margin: "3rem auto " }}>
      <h2>Sign UP</h2>
      {userRegistrationLoading && <LoaderAnimation />}
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            required="true"
            placeholder="Enter your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required="true"
            placeholder="Enter email"
            onChange={(e) => EmailSettingFunction(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {validEmail === false ? (
          <p style={{ color: "red" }}>*Enter a valid email</p>
        ) : null}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required="true"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="repassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            required="true"
            placeholder="Re-Enter your Password"
            onChange={(e) => ReEnterPassFun(e)}
          />
        </Form.Group>
        {samePass === false ? (
          <p style={{ color: "red" }}>* Enter same password</p>
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUPScreen;
