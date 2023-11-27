import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginLoading, userLoging } from "../reducers/userReducer";
import { useLocation } from "react-router-dom";
import { LoaderAnimation } from "../components/shared/loader";
import axios from "axios";
import { putUserDetails } from "../reducers/userAllInfoReducer";

export const userDetailFunction = () => {};
const SignInScreen = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorHandle, seterror] = useState(null);
  const location = useLocation();
  const history = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userLoggedIn, userLoggedInLoading } = user;

  useEffect(() => {
    if (userLoggedIn) {
      history("/products");
    }
  }, [history, userLoggedIn, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatch(userLoginLoading(true));
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const loginData = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        config
      );
      if (loginData) {
        const detailData = await axios.get(
          "http://localhost:8000/userProfile",
          {
            headers: {
              Authorization: "Bearer " + loginData.data.Token, //the token is a variable which holds the token
            },
          }
        );
        const { data } = loginData;
        dispatch(putUserDetails(detailData.data));
        dispatch(userLoginLoading(false));
        dispatch(userLoging(data));
      }
    } catch (error) {
      seterror(error.response.data.message);
    }
    userLoggedIn ? history("/products") : e.preventDefault();
  };

  return (
    <Container style={{ width: "30%", marginTop: "2rem" }}>
      <h2>Sign In</h2>
      {errorHandle && <p style={{ color: "red" }}>{errorHandle}</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div></div>
        <Form.Text className="text-muted">If not registered__</Form.Text>

        <Link to={"/register"}> SignUp </Link>
      </Form>
    </Container>
  );
};

export default SignInScreen;
