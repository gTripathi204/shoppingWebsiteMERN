import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import { fatchProducts } from "../reducers/productListReducer";
import { LoaderAnimation } from "../components/shared/loader";
import FailureAlert from "../components/shared/failureAlert";
import axios from "axios";
import Slider from "./homeScreen/sliders";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const products = productsList.productList[0];

  useEffect(() => {
    if (!products) {
      axios
        .get("http://localhost:8000/products")
        .then((data) => {
          dispatch(fatchProducts(data.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(fatchProducts(err));
        });
    }
  }, [dispatch]);

  return (
    <>
      <Row>
        <Slider />
        <div style={{margin:"2rem"}}></div>
        {products?.map((product) => (
          <ProductScreen product={product} />
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
