import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {
  Row,
  Col,
  Container,
  ButtonToolbar,
  Alert,
  Form,
  Image,
} from "react-bootstrap";
import { CheckOutSteps } from "../components/shared/breadCrems";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import { AddressUpdate } from "../components/shared/addressUpdateComponent";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeAllFromCart } from "../reducers/cartReducer";

function handleClick() {
  console.info("You clicked a breadcrumb.");
}

export const CheckOutScreen = () => {
  let [step, setStep] = useState(2);
  let [checkAddressLength, setcheckAddressLength] = useState(true);
  let [alert, setAlert] = useState(null);
  let [paymentMethod, setPaymentMethod] = useState(null);
  let [TotalAmout, setTotalAmout] = useState(null);

  const history = useNavigate();
  const dispatch = useDispatch();
  let userdetail = useSelector((state) => state.userdetails);
  const { userAllDetails } = userdetail;
  const { Address } = userAllDetails;

  const cartInfo = useSelector((state) => state.cart);
  const { cartItems } = cartInfo;

  const userLogin = useSelector((state) => state.user);
  const { userLoggedIn } = userLogin;

  const checkOutHandler = () => {
    setStep(3);
  };

  const paymentFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (paymentMethod === null) {
      setAlert("Please select a payment Method");
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } else {
      setStep(4);
    }
  };

  const finalOrderhandler = async () => {
    const placeOrderFun = await axios.post(
      "http://localhost:8000/orderPlacement",
      { userAllDetails, cartItems, paymentMethod, TotalAmout },
      {
        headers: {
          Authorization: "Bearer " + userLoggedIn.Token, //the token is a variable which holds the token
        },
      }
    );
    if (placeOrderFun.status === 200) {
      dispatch(removeAllFromCart());
      console.log("ohhh yaahh");
      history("/orderPlacedStamp");
    } else {
      console.log("naahhh");
    }
  };

  console.log(cartItems);
  let totalPaybleAmount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPaybleAmount += cartItems[i].price * cartItems[i].productQuantity;
  }
  console.log(totalPaybleAmount);

  useEffect(() => {
    setTotalAmout(totalPaybleAmount);
    if (Address.laneNumber && Address.city && Address.state && Address.pin) {
      setcheckAddressLength(false);
      setAlert(null);
    } else {
      setAlert("Please Update Address to checkout!");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  }, []);

  return (
    <>
      <CheckOutSteps props={step} />

      {step === 2 ? (
        <Container style={{ marginTop: "1rem" }}>
          {alert !== null ? <Alert variant="danger">{alert}</Alert> : null}
          <Row>
            <Col md="5" style={{ textAlign: "-webkit-center" }}>
              {userAllDetails.Address ? (
                <Card
                  style={{
                    width: "18rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Card.Header>
                    <h3>Address</h3>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Lane No. {userAllDetails.Address.laneNumber}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      City : {userAllDetails.Address.city}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      State : {userAllDetails.Address.state}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Country : {userAllDetails.Address.country}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Pin-Code : {userAllDetails.Address.pin}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="outline-success"
                    style={{ width: "100%" }}
                    onClick={checkOutHandler}
                    disabled={checkAddressLength}
                  >
                    Use This Address & CheckOut
                  </Button>
                </Card>
              ) : (
                <p style={{ color: "red" }}>No Address is given</p>
              )}
            </Col>
            <Col md="2">
              <div
                style={{
                  borderLeft: "2px solid gainsboro",
                  color: "grey",
                  height: "350px",
                  marginLeft: "50%",
                  marginTop: "15px",
                }}
              ></div>
            </Col>
            <AddressUpdate />
          </Row>
        </Container>
      ) : step === 3 ? (
        <>
          <Container style={{ margin: "1rem auto" }}>
            {alert !== null ? <Alert variant="danger">{alert}</Alert> : null}
            <div style={{ textAlign: "-webkit-center" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    <h3>Payment Method</h3>
                  </Card.Title>
                  <div id="verticalLine"></div>
                  <Card.Subtitle>Select Payment Method</Card.Subtitle>
                  <div id="verticalLine"></div>
                  <Card.Text>
                    <Form style={{ textAlign: "left", margin: "0 20px" }}>
                      <p>
                        <input
                          type="checkbox"
                          checked={paymentMethod === "debitCard"}
                          onClick={() => setPaymentMethod("debitCard")}
                        ></input>
                        &nbsp;&nbsp;&nbsp;Debit/Credit Card
                      </p>
                      <div style={{ width: "100px" }} id="verticalLine"></div>
                      <p>
                        <input
                          type="checkbox"
                          checked={paymentMethod === "netBanking"}
                          onClick={() => setPaymentMethod("netBanking")}
                        ></input>
                        &nbsp;&nbsp;&nbsp;Net Banking
                      </p>
                      <div style={{ width: "100px" }} id="verticalLine"></div>
                      <p>
                        <input
                          type="checkbox"
                          checked={paymentMethod === "UPI"}
                          onClick={() => setPaymentMethod("UPI")}
                        ></input>
                        &nbsp;&nbsp;&nbsp;UPI
                      </p>
                      <div style={{ width: "100px" }} id="verticalLine"></div>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="outline-success"
                          style={{ width: "100%" }}
                          onClick={paymentFormSubmitHandler}
                        >
                          Use This Method
                        </Button>
                      </div>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Row style={{ border: "groove" }}>
              <Col md="2" style={{ borderRight: "2px solid grey" }}>
                <h4>Image</h4>
              </Col>
              <Col md="6" style={{ borderRight: "2px solid grey" }}>
                <h4>Product Name</h4>
              </Col>
              <Col
                md="2"
                style={{ textAlign: "center", borderRight: "2px solid grey" }}
              >
                <h4>Product Quantity</h4>
              </Col>
              <Col md="2">
                <h4>Product price</h4>
              </Col>
            </Row>
            {cartItems.map((data) => {
              return (
                <>
                  <Row style={{ border: "groove" }}>
                    <Col md="2" style={{ borderRight: "2px solid grey" }}>
                      <Image
                        style={{ width: "80px", height: "80px" }}
                        src={data.image}
                      ></Image>
                    </Col>
                    <Col md="6" style={{ borderRight: "2px solid grey" }}>
                      <p>{data.name}</p>
                    </Col>
                    <Col
                      md="2"
                      style={{
                        textAlign: "center",
                        borderRight: "2px solid grey",
                      }}
                    >
                      <p>{data.productQuantity}</p>
                    </Col>
                    <Col md="2">
                      <p>
                        {data.productQuantity}*{data.price}=
                        {data.productQuantity * data.price}
                      </p>
                    </Col>
                  </Row>
                </>
              );
            })}
            <Row>
              <Col md="8"></Col>
              <Col md="4">
                <Card style={{ margin: "1rem 0" }}>
                  <Card.Title style={{ margin: "1rem 20%" }}>
                    Total Amount : {TotalAmout}
                  </Card.Title>
                  <Button
                    variant="outline-success"
                    style={{ width: "100%" }}
                    onClick={finalOrderhandler}
                  >
                    Place Order and Pay
                  </Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
