import { Component, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { ImageList } from "@mui/material";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const OrderDetailScreen = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const calculatePrice = (price, qtty) => {
    const sum = price * qtty;
    return sum;
  };

  let [orderPlacedFilter, setorderPlacedFilter] = useState("grayscale(1)");
  let [shippedFilter, setshippedFilter] = useState("grayscale(1)");
  let [outForDeliFilter, setoutForDeliFilter] = useState("grayscale(1)");
  let [orderDeliveredFilter, setorderDeliveredFilter] =
    useState("grayscale(1)");
  let [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    if (data.deliveryStatus === "Order Placed") {
      setorderPlacedFilter("none");
      setOrderStatus("Your order is placed successfully");
    } else if (data.deliveryStatus === "Order Shipped") {
      setorderPlacedFilter("none");
      setshippedFilter("none");
      setOrderStatus("Your order is been Shipped Successfully");
    } else if (data.deliveryStatus === "Out For Delivery") {
      setorderPlacedFilter("none");
      setshippedFilter("none");
      setoutForDeliFilter("none");
      setOrderStatus("Your order is out for Delivery");
    } else {
      setorderPlacedFilter("none");
      setshippedFilter("none");
      setoutForDeliFilter("none");
      setorderDeliveredFilter("none");
      setOrderStatus("Your order has been delivered");
    }
  }, []);

  return (
    <>
      <Container>
        <p style={{ color: "grey" }}>Order Id : {data._id}</p>
        <Card style={{ backgroundColor: "#F9F9F9" }}>
          {data.orderItems.map((product) => {
            return (
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: "2rem 2rem",
                  }}
                  src={product.image}
                ></img>
                <div style={{ margin: "2rem auto auto 2rem" }}>
                  <h4>{product.name}</h4>
                  <p style={{ color: "grey" }}>
                    Product Quantity : {product.productQuantity}
                  </p>
                </div>
                <div style={{ margin: " 2rem 2rem auto 0" }}>
                  <h5>Product Price : &nbsp;&nbsp;&nbsp;{product.price}</h5>
                  <p style={{ textAlign: "end" }}>X{product.productQuantity}</p>
                  <div id="verticalLine"></div>
                  <h5 style={{ textAlign: "end" }}>
                    {calculatePrice(product.price, product.productQuantity)}
                  </h5>
                  <div id="verticalLine"></div>
                </div>
              </div>
            );
          })}
        </Card>
        <Card
          style={{
            margin: "2rem auto",
            backgroundColor: "#F9F9F9",
            display: "-webkit-box",
          }}
        >
          <div style={{ margin: "2rem 2rem", width: "50%" }}>
            <h4>Delivery Address : </h4>
            <p> {data.shippingAddress.address}</p>
            <div style={{ display: "flex" }}>
              <h5>District &nbsp;:&nbsp;&nbsp;</h5>
              <p>{data.shippingAddress.city}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h5>Pincode &nbsp;:&nbsp;</h5>
              <p>{data.shippingAddress.pincode}</p>
            </div>
          </div>
          <div style={{ margin: "2rem 2rem auto auto" }}>
            <h4>Total Price&nbsp; :&nbsp; {data.totalPrice} </h4>
            <h6>Payment Method : {data.paymentMode}</h6>
          </div>
        </Card>
        <Card
          style={{
            margin: "2rem auto",
            backgroundColor: "#F9F9F9",
            padding: "2rem 2rem",
          }}
        >
          <h3>Delivery Status</h3>
          <div style={{ textAlign: "-webkit-center" }}>
            <div style={{ width: "70%" }}>
              <Row>
                <Col md="1" style={{ padding: "0" }}>
                  <div>
                    <img
                      src="/images/deliverySuccess.png"
                      style={{
                        height: "40px",
                        width: "40px",
                        marginLeft: "0",
                        filter: `${orderPlacedFilter}`,
                      }}
                    ></img>
                    <p style={{ fontSize: "10px" }}>Order Placed</p>
                  </div>
                </Col>
                <Col md="2" style={{ padding: "0" }}>
                  <div
                    style={{
                      borderTop: "4px solid",
                      color: "blue",
                      width: "100%",
                      marginTop: "18px",
                      filter: `${shippedFilter}`,
                    }}
                  ></div>
                </Col>

                <Col md="1" style={{ padding: "0" }}>
                  <div>
                    <img
                      src="/images/orderShipped.jpg"
                      style={{
                        height: "40px",
                        width: "40px",
                        marginLeft: "0",
                        filter: `${shippedFilter}`,
                      }}
                    ></img>
                    <p style={{ fontSize: "10px" }}>Order Shipped</p>
                  </div>
                </Col>
                <Col md="2" style={{ padding: "0" }}>
                  <div
                    style={{
                      borderTop: "4px solid",
                      color: "blue",
                      width: "100%",
                      marginTop: "18px",
                      filter: `${outForDeliFilter}`,
                    }}
                  ></div>
                </Col>

                <Col md="1" style={{ padding: "0" }}>
                  <div>
                    <img
                      src="/images/orderedDeliv.png"
                      style={{
                        height: "30px",
                        width: "45px",
                        marginLeft: "0",
                        filter: `${outForDeliFilter}`,
                      }}
                    ></img>
                    <p style={{ fontSize: "10px" }}>Order Out For Delivery</p>
                  </div>
                </Col>
                <Col md="2" style={{ padding: "0" }}>
                  <div
                    style={{
                      borderTop: "4px solid",
                      color: "blue",
                      width: "100%",
                      marginTop: "18px",
                      filter: `${orderDeliveredFilter}`,
                    }}
                  ></div>
                </Col>
                <Col md="1" style={{ padding: "0" }}>
                  <div>
                    <img
                      src="/images/orderedDelivered.png"
                      style={{
                        height: "50px",
                        width: "50px",
                        marginLeft: "0",
                        filter: `${orderDeliveredFilter}`
                      }}
                    ></img>
                    <p style={{ fontSize: "10px" }}>Order Delivered!</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <p>*&nbsp;{orderStatus}</p>
        </Card>
      </Container>
    </>
  );
};
