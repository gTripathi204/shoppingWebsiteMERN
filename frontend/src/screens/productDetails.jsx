import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fatchProductInfo,
  fatchProductInfoLoading,
} from "../reducers/productInfoReducer";
import { LoaderAnimation } from "../components/shared/loader";
import FailureAlert from "../components/shared/failureAlert";

import {
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from "react-bootstrap";
import RatingComponent from "../components/ratingComponent";
import axios from "axios";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const id = useParams();
  const fid = id.id;

  const productDetails = useSelector((state) => state.productInfo);
  const { productInfo, productInfoLoading } = productDetails;

  useEffect(() => {
    dispatch(fatchProductInfoLoading(true));
    axios
      .get(`http://localhost:8000/products/${fid}`)
      .then((data) => {
        dispatch(fatchProductInfoLoading(false));
        dispatch(fatchProductInfo(data.data));
      })
      .catch((err) => {
        dispatch(fatchProductInfoLoading(false));
        dispatch(fatchProductInfo(err));
      });
  }, [dispatch]);

  var [countNumberOfProducts, setCountNumberOfProducts] = useState(1);

  if (productInfo.countInStock === 0) {
    countNumberOfProducts = 0;
  }

  var history = useNavigate();

  function addToCartHandler() {
    if (countNumberOfProducts !== 0) {
      history(`/cart/${fid}?qty=${countNumberOfProducts}`);
    }
  }

  return (
    <>
      <Container>
        {productInfoLoading ? <productInfoLoading /> : null}
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            margin: "1rem 0 ",
          }}
          to={"/products"}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2xl"
            style={{
              "--fa-primary-color": "#000000",
              "--fa-secondary-color": "#000000",
            }}
          />{" "}
          &nbsp; GO BACK
        </Link>
        <Row>
          <Col md="6">
            <Image
              style={{ marginBottom: "3rem" , width:"80%", height:"28rem"}}
              src={productInfo.image}
            ></Image>
          </Col>
          <Col md="3">
            <ListGroup.Item>
              {" "}
              <h2 style={{ marginTop: "15px" }}> {productInfo.name} </h2>
            </ListGroup.Item>
            <h3>₹{" "}{productInfo.price} </h3>
            <hr></hr>

            <ListGroupItem>
              <h6 style={{ marginTop: "15px" }}>
                Rating : <RatingComponent rating={productInfo.rating} />{" "}
                {productInfo.rating}
              </h6>
            </ListGroupItem>
            <hr></hr>
            <ListGroupItem style={{ color: "#353131" }}>
              {productInfo.description}
            </ListGroupItem>
            <hr></hr>
          </Col>
          <Col md="3" style={{ textAlign: "-webkit-center" }}>
            <Row>
              <Col>
                {" "}
                <h4 style={{ display: "contents" }}>Status : &nbsp; </h4>{" "}
                {productInfo.countInStock > 0 ? (
                  productInfo.countInStock > 5 ? (
                    <h6 style={{ display: "contents", color: "green" }}>
                      {" "}
                      in stock
                    </h6>
                  ) : (
                    <h6 style={{ display: "contents", color: "#1a8cff" }}>
                      {" "}
                      Hurry only {productInfo.countInStock} left
                    </h6>
                  )
                ) : (
                  <h6 style={{ display: "contents", color: "red" }}>
                    {" "}
                    out of stock
                  </h6>
                )}
              </Col>
            </Row>
            <Row style={{ display: "inline-flex", marginTop: "1rem" }}>
              <Col>
                <Button
                  variant="outline-warning"
                  onClick={() =>
                    countNumberOfProducts < productInfo.countInStock
                      ? setCountNumberOfProducts(countNumberOfProducts + 1)
                      : null
                  }
                >
                  +
                </Button>
              </Col>
              <Col>
                <p style={{ marginTop: "30%" }}>{countNumberOfProducts}</p>
              </Col>
              <Col>
                <Button
                  variant="outline-warning"
                  onClick={() =>
                    countNumberOfProducts > 1
                      ? setCountNumberOfProducts(countNumberOfProducts - 1)
                      : null
                  }
                >
                  -
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem", width: "80%" }}>
              <Button variant="outline-warning" onClick={addToCartHandler}>
                {" "}
                add to cart
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
