import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addAllOrders, addAllOrdersLoading } from "../reducers/ordersReducers";
import { Card, Col, Container, Spinner } from "react-bootstrap";
import { Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MyOrdersScreen = () => {
  const user = useSelector((state) => state.user);
  const { userLoggedIn } = user;

  const dispatch = useDispatch();

  const allOrdersSlice = useSelector((state) => state.myAllOrder);
  const { myAllOrders, myAllOrderLoading } = allOrdersSlice;

  const orderFatchFun = async () => {
    const allOrdersFatch = await axios.get("http://localhost:8000/MyOrders", {
      headers: {
        Authorization: "Bearer " + userLoggedIn.Token,
      },
    });
    if (allOrdersFatch) {
      dispatch(addAllOrders(allOrdersFatch.data));
      dispatch(addAllOrdersLoading(false));
      console.log(allOrdersFatch.data);
    }
  };

  useEffect(() => {
    orderFatchFun();
  }, []);

  const datamanagefun = (data) => {
    const date = JSON.stringify(data);
    return date.slice(1, 11);
  };

  return (
    <>
      {myAllOrders === null ? (
        <div style={{ margin: "auto auto", textAlignLast: "center" }}>
          <Spinner
            animation="border"
            style={{
              color: "rgb(229, 143, 232)",
              width: "6rem",
              height: "6rem",
            }}
          ></Spinner>
        </div>
      ) : (
        <Container style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <h1
            style={{
              textDecoration: "underlined",
              color: "rgb(229, 143, 232)",
            }}
          >
            𝐘𝐨𝐮𝐫 𝐎𝐫𝐝𝐞𝐫𝐬
          </h1>
          <Row
            style={{
              border: "groove",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor:"#E8E6FF",
              // color:'white'
            }}
          >
            <Col md="1" style={{ borderRight: "2px solid grey", padding: "0" }}>
              <h5>Order Date</h5>
            </Col>
            <Col md="7" style={{ borderRight: "2px solid grey", padding: "0" }}>
              <h5 style={{ marginLeft: "15px" }}>Products</h5>
            </Col>
            <Col
              md="1"
              style={{
                textAlign: "center",
                borderRight: "2px solid grey",
                padding: "0",
              }}
            >
              <h5>Items</h5>
            </Col>
            <Col
              md="1"
              style={{
                textAlign: "center",
                borderRight: "2px solid grey",
                padding: "0",
              }}
            >
              <h5>Delivery Status</h5>
            </Col>
            <Col
              md="1"
              style={{
                textAlign: "center",
                borderRight: "2px solid grey",
                padding: "0",
              }}
            >
              <h5>Total Price</h5>
            </Col>
            <Col
              md="1"
              style={{
                textAlign: "center",
                borderRight: "2px solid grey",
                padding: "0",
              }}
            >
              <h5>Details</h5>
            </Col>
          </Row>
          {myAllOrders.map((data) => {
            return (
              <Row style={{ border: "groove" }}>
                <Col
                  md="1"
                  style={{ borderRight: "2px solid grey", padding: "0" }}
                >
                  <p style={{ fontWeight: "bold" }}>
                    {datamanagefun(data.createdAt)}
                  </p>
                </Col>
                <Col
                  md="7"
                  style={{ borderRight: "2px solid grey", padding: "0" }}
                >
                  {data.orderItems.map((product) => {
                    return (
                      <div style={{ display: "flex" }}>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "10px 10px",
                            borderRadius: "50%",
                          }}
                          src={product.image}
                        ></img>
                        <p
                          style={{
                            fontWeight: "bold",
                            margin: "auto auto auto 12px",
                          }}
                        >
                          {" "}
                          {product.name}{" "}
                        </p>
                      </div>
                    );
                  })}
                </Col>
                <Col
                  md="1"
                  style={{
                    textAlign: "center",
                    borderRight: "2px solid grey",
                    padding: "0",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{data.orderItems.length}</p>
                </Col>
                <Col
                  md="1"
                  style={{
                    textAlign: "center",
                    borderRight: "2px solid grey",
                    padding: "0",
                  }}
                >
                  {data.deliveryStatus}
                </Col>
                <Col
                  md="1"
                  style={{
                    textAlign: "center",
                    borderRight: "2px solid grey",
                    padding: "0",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{data.totalPrice}</p>
                </Col>
                <Col
                  md="1"
                  style={{
                    textAlign: "center",
                    borderRight: "2px solid grey",
                    padding: "0",
                  }}
                >
                  <Link to="/orderProductDetail" state={data}>Detail</Link>
                </Col>
              </Row>
            );
          })}
        </Container>
      )}
    </>
  );
};
