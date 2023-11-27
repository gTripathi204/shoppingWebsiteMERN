import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Alert, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  ListGroup,
  Container,
} from "react-bootstrap";

import { addToCart, removeFromCart } from "../reducers/cartReducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export const CartScreen = () => {
  const params = useParams();
  const productId = params.id;
  const productQuantity = useLocation().search.slice(5);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userdetails);
  const { userAllDetails } = userDetails;

  async function putDataOncartHandler(productId, productQuantity) {
    const { data } = await axios.get(`http://localhost:8000/products/${productId}`);
    const productAddForCart = {
      _id: data._id,
      name: data.name,
      image: data.image,
      brand: data.brand,
      price: data.price,
      countInStock: data.countInStock,
      productQuantity,
    };
    dispatch(addToCart(productAddForCart, productQuantity));
  }

  let [notification, setNotification] = useState(null);
  let [notificationLink, setNotificationLink] = useState(null);

  useEffect(() => {
    if (productId) {
      putDataOncartHandler(productId, productQuantity);
    }
  }, [dispatch, productId, productQuantity]);

  const cartproducts = useSelector((state) => state.cart);
  const items = cartproducts.cartItems;

  const addFun = (x, y) => {
    
    var p = parseInt(x);
    var q = parseInt(y);
    return p + q;
  };
  const subFun = (x, y) => {
    if (x <= y) {
      return x;
    } else {
      return x - y;
    }
  };

  const nevigat = useNavigate();

  var totalItem = 0;
  var totalprice = 0;

  items.map((p) => {
    totalItem = totalItem + parseInt(p.productQuantity);
    totalprice = totalprice + parseInt(p.productQuantity * p.price);
  });

  const cartProductDeleteFunction = (productID) => {
    dispatch(removeFromCart(productID));
  };

  const checkOutHandler = () => {
    if (userAllDetails === null) {
      console.log(items.length);
      setNotification(`Please login First `);
      setNotificationLink("/login");
    } else {
      if (items.length === 0) {
        setNotification("Please Add products to continue checkout");
        setNotificationLink("");
      } else {
        nevigat("/checkOut")
      }
    }
  };

  const clickHandler =()=> {
      nevigat(notificationLink);
  }


  return (
    <Row>
      <Col
        md="5"
        style={{ marginTop: "2rem", marginLeft: "10rem", borderTop: "5px" }}
      >
        {notification && (
          <Alert>
            {notification}{" "}
            <Alert.Link onClick={clickHandler}>{notificationLink}</Alert.Link>{" "}
          </Alert>
        )}
        {items.map((x) => (
          <>
            <Col>
              <Row>
                <Col md="3">
                  <Image style={{ width: "8rem" }} src={x.image}></Image>
                </Col>
                <Col md="4">
                  <Row>
                    <h5>{x.name}</h5>
                  </Row>
                  <Row>
                    <p>{x.brand}</p>
                  </Row>
                </Col>
                <Col md="2">
                  <Row>
                    <p>₹ {x.price}</p>
                  </Row>
                </Col>
                <Col md="3">
                  <Row>
                    <DropdownButton
                      variant="text-primary"
                      id="dropdown-basic-button"
                      title={`${x.productQuantity}    `}
                      className="ml-3"
                    >
                    {(x.countInStock > x.productQuantity) ? (
                      <Dropdown.Item
                        onClick={() => {
                          nevigat(
                            `/cart/${x._id}?qty=${addFun(x.productQuantity, 1)}`
                          );
                        }}
                      >
                      { addFun(x.productQuantity, 1)}
                      </Dropdown.Item>
                    ) : (
                      <DropdownItem>
                       Limit reached!
                      </DropdownItem>
                    )}
                      <Dropdown.Item
                        onClick={() => {
                          nevigat(
                            `/cart/${x._id}?qty=${subFun(x.productQuantity, 1)}`
                          );
                        }}
                      >
                        {subFun(x.productQuantity, 1)}
                      </Dropdown.Item>
                    </DropdownButton>
                  </Row>
                  <Row>
                    <Col style={{ marginTop: "5px", marginLeft: "10px" }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="lg"
                        onClick={() => cartProductDeleteFunction(x._id)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr></hr>
            </Col>
          </>
        ))}
      </Col>
      <Col md="1"></Col>
      <Col md="3" style={{ marginTop: "2rem" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <h3 style={{ marginBottom: "1.7rem" }}>Order Summery</h3>
            </Card.Title>
            <Card.Subtitle>
              <h5>Total quantity : {totalItem}</h5>
            </Card.Subtitle>
            <hr></hr>
            <Card.Subtitle>
              <h3>
                Total : {""} {totalprice}
              </h3>
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-success"
              style={{ width: "100%" }}
              onClick={checkOutHandler}
            >
              CheckOut
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
