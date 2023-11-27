import { useDispatch, useSelector } from "react-redux";
import { LoaderAnimation } from "../components/shared/loader";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putUserDetails } from "../reducers/userAllInfoReducer";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Select from "react-dropdown-select";
import { statesInindia } from "../constents/statesInIndiaObject";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { AddressUpdate } from "../components/shared/addressUpdateComponent";

const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  let country = "India";

  const userdata = useSelector((state) => state.userdetails);
  const { userAllDetails } = userdata;

  const user = useSelector((state) => state.user);
  const { userLoggedIn } = user;


  if (userAllDetails) {
    return (
      <Container>
        <Row>
          <Col md="5">
            <Row style={{ marginTop: "5px" }}>
              <Col md="1">
                <h2>Hi,</h2>{" "}
              </Col>
              <Col>
                <h2>{userAllDetails.name}</h2>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              {" "}
              <Card>
                <Card.Body>{userAllDetails.email}</Card.Body>
              </Card>
            </Row>
            <Row></Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col md="3">
                <h4>Phone No.</h4>
              </Col>
              <Col>
                <Card>
                  <Card.Body>{userAllDetails.phoneNumber}</Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <>
                {userAllDetails.Address ? (
                  <Card
                    style={{
                      width: "18rem",
                      marginTop: "1rem",
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
                  </Card>
                ) : (
                  <p style={{ color: "red" }}>No Address is given</p>
                )}
              </>
            </Row>
          </Col>
          <Col md="1"></Col>
          <AddressUpdate/>
        </Row>
      </Container>
    );
  } else {
    history("/login");
  }
};

export default UserDetailsScreen;
