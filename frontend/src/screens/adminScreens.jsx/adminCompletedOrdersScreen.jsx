import React from "react";
import { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  addAllCompletedOrders,
  addAllCompletedOrdersLoader,
} from "../../reducers/adminReducers/adminAllCompletedOrder";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoaderAnimation } from "../../components/shared/loader";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
////

export const AdminCompletedOrderScreen = () => {
  const adminToken = useSelector((state) => state.admin);
  const { adminLoggedIn } = adminToken;
  const completedOrders = useSelector((state) => state.completedOrders);
  const { adminAllCompletedOrdersLoadingStatus, adminAllCompletedOrders } =
    completedOrders;

  const dispatch = useDispatch();
  let [errorFatch, setErrorFatch] = useState(null);
  // let [addCompletedOrder, setAddCompletedOrder] = useState(null);

  const fatchData = async () => {
    try {
      dispatch(addAllCompletedOrdersLoader(true));
      const allCompletedOrdersfatch = await axios.get(
        "http://localhost:8000/allCompletedOrders",
        {
          headers: {
            Authorization: `Bearer ${adminLoggedIn.Token}`,
          },
        }
      );
      if (allCompletedOrdersfatch) {
        dispatch(addAllCompletedOrdersLoader(false));
        dispatch(addAllCompletedOrders(allCompletedOrdersfatch.data));
      }
    } catch (error) {
      dispatch(addAllCompletedOrdersLoader(false));
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
      {adminAllCompletedOrdersLoadingStatus === true ? (
        <LoaderAnimation />
      ) : null}
      {errorFatch ? <Alert variant="danger">Something went wrong</Alert> : null}
      {adminAllCompletedOrders.length !== 0 ? (
        <Container>
          {adminAllCompletedOrders.map((data) => {
            return (
              <Card id="adminCompleteOrderCard">
                <Row>
                  <div>
                    <h6 style={{ margin: "0", fontWeight: "normal" }}>
                      Order Id : {data._id}
                    </h6>
                  </div>
                </Row>
                <Row>
                  <h5>Orders Detail</h5>
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
                        Delivered Date :{" "}
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
                          #Delivered
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
