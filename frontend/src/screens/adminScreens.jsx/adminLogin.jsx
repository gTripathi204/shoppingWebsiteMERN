import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import e from "cors";
import { addAdminLogin } from "../../reducers/adminReducers/adminReducer";

export const AdminSignInScreen = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorHandle, seterror] = useState(null);
  const location = useLocation();
  const history = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Clear-Site-Data": "*",
        },
      };

      const adminlogin = await axios.post(
        "http://localhost:8000/adminLogin",
        {
          email,
          password,
        },
        config
      );
      if (adminlogin) {
        history("/adminHome");
        dispatch(addAdminLogin(adminlogin.data));
      }
    } catch (error) {
      seterror(error.response.data.message);
    }
  };

  return (
    <Container style={{ width: "30%", marginTop: "2rem" }}>
      <h2>Admin Login </h2>
      {errorHandle && <p style={{ color: "red" }}>{errorHandle}</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              seterror(null);
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              seterror(null);
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          go to Admin Page
        </Button>
        <div></div>
      </Form>
    </Container>
  );
};
