import React from "react";
import { Card, Button } from "react-bootstrap";
import RatingComponent from "../components/ratingComponent";
import { Link } from "react-router-dom";

var productScreen = (props) => {
  var propPrice = props.product.price;
  var propDiscount = props.product.discont;
  const calculateDiscountPrice = ((100 - propDiscount) / 100) * propPrice;

  return (
    <Card
      style={{ width: "18rem", margin: "0 2.5rem 3rem 0", padding: "15px" }}
    >
      <Link to={`/products/${props.product._id}`}>
        <a className="good-looking-anchartag">
          <Card.Img style={{height:"250px"}} variant="top" src={props.product.image} />
        </a>
      </Link>
      <Link className="good-looking-anchartag" to={`/product/${props.product._id}`}>
        <a className="good-looking-anchartag">
          <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <>
              <Card.Subtitle id="cardDiscountedPrice">
                {Math.floor(calculateDiscountPrice)}₹
              </Card.Subtitle>
              <Card.Text id="cardMainPrice"> {props.product.price}/-</Card.Text>
            </>
          </Card.Body>
        </a>
      </Link>
      <Card.Text as="div">
        <RatingComponent rating={props.product.rating} />
        &nbsp;
        <span> {props.product.numReviews}</span>
      </Card.Text>
      <Card.Text  className="infoProduct">{props.product.description}</Card.Text>
    </Card>
  );
};

export default productScreen;
