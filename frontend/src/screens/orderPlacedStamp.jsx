import * as React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const OrderPlacedStamp = () => {
  let [LoadinTiming, setloadingTiming] = useState(true);
  const history = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        setloadingTiming(false);
        setTimeout(() => {
          history("/MyOrders");
        }, 1000);
      }, 2000);
    }, []);
  return (
    <>
      {LoadinTiming == true ? (
        <div style={{ margin: "auto auto", textAlignLast: "center" }}>
          <Spinner
            animation="border"
            style={{
              color: "rgb(229, 143, 232)",
              width: "6rem",
              height: "6rem",
            }}
          ></Spinner>
          <h3>Placing Your Order</h3>
        </div>
      ) : null}
      {LoadinTiming === false ? (
        <>
          <div style={{ margin: "auto auto", textAlignLast: "center" }}>
            <FontAwesomeIcon
              icon={faCheck}
              beat
              style={{ color: "#e58fe8", width: "6rem", height: "6rem" }}
            />
            <h1>Order Placed</h1>
          </div>
        </>
      ) : null}
    </>
  );
};
