import React from "react";
import { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  addAllCancelledOrders,
  addAllCancelledOrdersLoader,
} from "../../reducers/adminReducers/adminAllCancelledOrderReducer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoaderAnimation } from "../../components/shared/loader";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
////
export const AdminAllCancelledScreen = () => {
  const adminToken = useSelector((state) => state.admin);
  const { adminLoggedIn } = adminToken;
  const cancelledOrders = useSelector((state) => state.cancelledOrders);
  const { adminAllCancelledOrdersLoadingStatus, adminAllCancelledOrders } =
    cancelledOrders;

  const dispatch = useDispatch();
  let [errorFatch, setErrorFatch] = useState(null);
  // let [addCompletedOrder, setAddCompletedOrder] = useState(null);

  const fatchData = async () => {
    try {
      dispatch(addAllCancelledOrdersLoader(true));
      const allCompletedOrdersfatch = await axios.get(
        "http://localhost:8000/allCancelledOrders",
        {
          headers: {
            Authorization: `Bearer ${adminLoggedIn.Token}`,
          },
        }
      );
      if (allCompletedOrdersfatch) {
        dispatch(addAllCancelledOrdersLoader(false));
        dispatch(addAllCancelledOrders(allCompletedOrdersfatch.data));
      }
    } catch (error) {
      dispatch(addAllCancelledOrdersLoader(false));
      setErrorFatch(error);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  function createdDateDis(date) {
    const dateSlice = date.slice(0, 10);
    const time = date.slice(11, 16);

    return `${dateSlice} : ${time}`;
  }

  return (
    <>
      {adminAllCancelledOrdersLoadingStatus === true ? (
        <LoaderAnimation />
      ) : null}
      {errorFatch ? <Alert variant="danger">Something went wrong</Alert> : null}
      {adminAllCancelledOrders.length !== 0 ? (
        <Container>
          {adminAllCancelledOrders.map((data) => {
            return (
              <Card id="adminCancelledOrderCard">
                <Row>
                  <div>
                    <h6 style={{ margin: "0", fontWeight: "normal" }}>
                      Order Id : {data._id}
                    </h6>
                  </div>
                </Row>
                <Row>
                  <h5>Cancelled Orders Detail</h5>
                </Row>
                <Row>
                  <Col md="3">
                    <h6
                      style={{ fontSize: "18px", textDecoration: "underline" }}
                    >
                      Products
                    </h6>
                    {data.orderItems.map((products) => {
                      return (
                        <div>
                          <h6 style={{ margin: "0" }}>
                            Name : {products.name}
                          </h6>
                          <h6 style={{ margin: "0", fontWeight: "normal" }}>
                            {" "}
                            Quantity: {products.productQuantity}
                          </h6>
                        </div>
                      );
                    })}
                  </Col>
                  <Col md="2">
                    <h6
                      style={{ fontSize: "18px", textDecoration: "underline" }}
                    >
                      Total Amount
                    </h6>
                    <h6 style={{ margin: "0", fontWeight: "normal" }}>
                      Rupees : &nbsp;{data.totalPrice}
                    </h6>
                    <h6 style={{ fontSize: "15px" }}>{data.paymentMode}</h6>
                  </Col>
                  <Col md="2" style={{ padding: "0" }}>
                    <h6
                      style={{ fontSize: "18px", textDecoration: "underline" }}
                    >
                      Dates
                    </h6>
                    <h6
                      style={{
                        fontSize: "13.5px",
                        margin: "0",
                        fontWeight: "normal",
                        display: "flex",
                      }}
                    >
                      <h6 style={{ fontSize: "15px", width: "120px" }}>
                        Order Date :
                      </h6>
                      {createdDateDis(data.createdAt)}
                    </h6>
                    <h6
                      style={{
                        fontSize: "13.5px",
                        margin: "0",
                        fontWeight: "normal",
                        display: "flex",
                      }}
                    >
                      <h6 style={{ fontSize: "15px", width: "120px" }}>
                        {" "}
                        Cancelled Date :{" "}
                      </h6>
                      {createdDateDis(data.updatedAt)}
                    </h6>
                  </Col>
                  <Col md="">
                    <Row>
                      <Col md="4">
                        <h6
                          style={{
                            fontSize: "18px",
                            textDecoration: "underline",
                          }}
                        >
                          Address :
                        </h6>
                        <h6
                          style={{
                            fontSize: "18px",
                            textDecoration: "underline",
                          }}
                        >
                          #Cancelled
                        </h6>
                      </Col>
                      <Col>
                        <div>
                          <div id="flexDiv">
                            <h6 style={{ fontWeight: "bold", margin: "0" }}>
                              Address&nbsp;&nbsp;:&nbsp;&nbsp;
                            </h6>
                            <h6 style={{ margin: "0", fontWeight: "normal" }}>
                              {" "}
                              {data.shippingAddress.address}
                            </h6>
                          </div>
                          <div id="flexDiv">
                            <h6 style={{ fontWeight: "bold", margin: "0" }}>
                              City&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h6>
                            <h6 style={{ margin: "0", fontWeight: "normal" }}>
                              {" "}
                              {data.shippingAddress.city}
                            </h6>
                          </div>
                          <div id="flexDiv">
                            <h6 style={{ fontWeight: "bold", margin: "0" }}>
                              Pincode&nbsp;&nbsp;:&nbsp;&nbsp;
                            </h6>
                            <h6 style={{ margin: "0", fontWeight: "normal" }}>
                              {" "}
                              {data.shippingAddress.pincode}
                            </h6>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <div>
                    <h6 style={{ margin: "10px 0 0 0 ", fontWeight: "normal" }}>
                      User Id : {data.user}
                    </h6>
                  </div>
                </Row>
              </Card>
            );
          })}
        </Container>
      ) : (
        <Container>
          <Alert>
            <h1>There is no completed orders</h1>
          </Alert>
        </Container>
      )}
    </>
  );
};
