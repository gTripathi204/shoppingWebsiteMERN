import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const AdminHomeScreen = () => {
  let [card1Color, setCard1Color] = useState("#BAD4DA");
  let [card2Color, setCard2Color] = useState("#D5D7BC");
  let [card3Color, setCard3Color] = useState("#82E0AA");
  let [card4Color, setCard4Color] = useState("#F0B2B2");

  return (
    <Container>
      <LinkContainer
        to="/adPendingOrders"
        style={{
          backgroundColor: `${card1Color}`,
          textAlign: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => setCard1Color("#A0DEEC")}
        onMouseLeave={() => setCard1Color("#BAD4DA")}
      >
        <Card className="adminHomeCard">
          <Card.Title>Check All Pending Orders</Card.Title>
        </Card>
      </LinkContainer>
      <LinkContainer
        to="/adCompletedOrders"
        style={{
          backgroundColor: `${card2Color}`,
          textAlign: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => setCard2Color("#E8EDA8")}
        onMouseLeave={() => setCard2Color("#D5D7BC")}
      >
        <Card className="adminHomeCard">
          <Card.Title>Check All Completed Orders</Card.Title>
        </Card>
      </LinkContainer>
      <LinkContainer
        to="/adAddProducts"
        style={{
          backgroundColor: `${card3Color}`,
          textAlign: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => setCard3Color("#27AE60")}
        onMouseLeave={() => setCard3Color("#82E0AA")}
      >
        <Card className="adminHomeCard">
          <Card.Title>Add A Product</Card.Title>
        </Card>
      </LinkContainer>
      <LinkContainer
        to="/adCancelledOrders"
        style={{
          backgroundColor: `${card4Color}`,
          textAlign: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => setCard4Color("#F27474")}
        onMouseLeave={() => setCard4Color("#F0B2B2")}
      >
        <Card className="adminHomeCard">
          <Card.Title>All Cancelled Orders</Card.Title>
        </Card>
      </LinkContainer>
    </Container>
  );
};
