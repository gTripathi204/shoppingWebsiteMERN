import { useDispatch, useSelector } from "react-redux";
import { LoaderAnimation } from "./loader";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putUserDetails } from "../../reducers/userAllInfoReducer";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Select from "react-dropdown-select";
import { statesInindia } from "../../constents/statesInIndiaObject";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

export const AddressUpdate = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  let country = "India";

  let [phoneNumber, setphoneNoHook] = useState("");
  let [laneNumber, setlaneNoHook] = useState("");
  let [city, setcityHook] = useState("");
  let [state, setstateHook] = useState("");
  let [pin, setpinHook] = useState("");
  let [dataUpdatedAlert, setDataUpdatedAlert] = useState(null);
  let [AllDataInputAlert, setAllDataInputAlert] = useState(null);

  const user = useSelector((state) => state.user);
  const { userLoggedIn } = user;

  const submithandler = async (e) => {
    e.preventDefault();
    if (phoneNumber && laneNumber && city && state && pin) {
      const data = await axios.post(
        "/userInfoUpdate",
        { phoneNumber, laneNumber, city, state, pin, country },
        {
          headers: {
            Authorization: "Bearer " + userLoggedIn.Token,
          },
        }
      );
      if (data) {
        console.log("Updated");
        setlaneNoHook("");
        setcityHook("");
        setphoneNoHook("");
        setpinHook("");
        setstateHook("");
        const detailData = await axios.get("/userProfile", {
          headers: {
            Authorization: "Bearer " + userLoggedIn.Token, //the token is a variable which holds the token
          },
        });

        await dispatch(putUserDetails(detailData.data));
        setDataUpdatedAlert("Profile Updated Successfully");
        setTimeout(() => {
          setDataUpdatedAlert(null);
        }, 5000);
      }
    } else {
      setAllDataInputAlert("Plaese Enter All Details");
      setTimeout(() => {
        setAllDataInputAlert(null);
      }, 5000);
    }
  };
  return (
    <Col md="5">
      <Row>
        {AllDataInputAlert !== null ? (
          <Alert variant="warning">{AllDataInputAlert}</Alert>
        ) : null}

        {dataUpdatedAlert !== null ? (
          <p style={{ color: "green" }}>Data updated Successfully</p>
        ) : null}
      </Row>
      <Row>
        <h3 style={{ marginTop: "rem" }}> Update your profile Information!</h3>

        <form onSubmit={submithandler}>
          <label style={{ marginTop: "1rem" }}>
            Phone No.{" "}
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setphoneNoHook(e.target.value)}
            ></input>
          </label>
          <label style={{ marginTop: "1rem" }}>
            Lane No. &nbsp;&nbsp;{" "}
            <input
              type="text"
              value={laneNumber}
              onChange={(e) => setlaneNoHook(e.target.value)}
            ></input>
          </label>
          <label style={{ marginTop: "1rem" }}>
            {" "}
            City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <input
              type="text"
              value={city}
              onChange={(e) => setcityHook(e.target.value)}
            ></input>
          </label>
          <label style={{ marginTop: "1rem" }}>
            {" "}
            State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
              style={{ height: "32px", width: "258px" }}
              value={state}
              onChange={(e) => setstateHook(e.target.value)}
            >
              <option value={""}>__select__</option>
              {statesInindia.map((MakeItem) => {
                return <option value={MakeItem}>{MakeItem}</option>;
              })}
            </select>
          </label>
          <label style={{ marginTop: "1rem" }}>
            {" "}
            Pincode &nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <input
              type="text"
              value={pin}
              onChange={(e) => setpinHook(e.target.value)}
            ></input>
          </label>
          <Row style={{ marginTop: "1rem" }}>
            <Col>
              <Card style={{ height: "32px", width: "230px", marginLeft: "15%" }}>
                &nbsp; {country}
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col md="5"></Col>
            <Col md="5">
              {" "}
              <Button
                variant="outline-success"
                style={{ width: "80%" }}
                type="submit"
              >
                update
              </Button>
            </Col>
          </Row>
        </form>
      </Row>
    </Col>
  );
};
