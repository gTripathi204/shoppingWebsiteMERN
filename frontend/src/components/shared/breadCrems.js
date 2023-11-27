import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

export const CheckOutSteps = (props) => {
  let [signinBlurBread, setsigninBlurBread] = useState(true);
  let [AddressBlurBread, setAddressBlurBread] = useState(true);
  let [paymentBlurBread, setpaymentBlurBread] = useState(true);
  let [finalOrderBlurBread, setfinalOrderBlurBread] = useState(true);

  const userdetail = useSelector((state) => state.userdetails);
  const { userAllDetails } = userdetail;

  useEffect(() => {
    if (props.props === 1) {
      setsigninBlurBread(false);
      setAddressBlurBread(true);
      setpaymentBlurBread(true);
      setfinalOrderBlurBread(true);
    } else if (props.props === 2) {
      setsigninBlurBread(true);
        setAddressBlurBread(false);
        setpaymentBlurBread(true);
        setfinalOrderBlurBread(true);
    } else if (props.props === 3) {
      setsigninBlurBread(true);
        setAddressBlurBread(true);
        setpaymentBlurBread(false);
        setfinalOrderBlurBread(true);
    } else {
      setsigninBlurBread(true);
        setAddressBlurBread(true);
        setpaymentBlurBread(true);
        setfinalOrderBlurBread(false);
    }
  });

  return (
    <>
      <Nav style={{ justifyContent: "center"}}>
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled={signinBlurBread}>SignIn /</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled={AddressBlurBread}>Address /</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled={paymentBlurBread}>Payment /</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled={finalOrderBlurBread}>Final Order</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </>
  );
};
