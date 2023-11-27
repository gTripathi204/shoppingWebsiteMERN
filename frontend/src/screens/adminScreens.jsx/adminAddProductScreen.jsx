import { Alert, Button, Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { asyncHandler } from "express-async-handler";
/////
export const AdminAddProductsScreen = (req, res) => {
  useEffect(() => {}, []);

  const adminToken = useSelector((state) => state.admin);
  const { adminLoggedIn } = adminToken;
  ///

  const history = useNavigate();
  ///
  let [productName, setProductName] = useState(null);
  let [Description, setdescription] = useState(null);
  let [brand, setbrand] = useState(null);
  let [catagory, setcatagory] = useState(null);
  let [price, setprice] = useState(null);
  let [discont, setdiscont] = useState(0);
  let [countInStock, setcountInStock] = useState(null);
  let [productImage, setproductImage] = useState(null);
  let [error, seterror] = useState(null);
  let [modalData, setModalData] = useState(null);
  const [validated, setValidated] = useState(false);

  const placeOrderFunction = async (event) => {
    if (adminLoggedIn === null) {
      event.preventDefault();
      return seterror("Admin not logged in ");
    }
    try {
      const fd = new FormData();
      fd.append("productImage", productImage);
      fd.append("productName", productName);
      fd.append("productDescription", Description);
      fd.append("productBrand", brand);
      fd.append("productCatagory", catagory);
      fd.append("productPrice", price);
      fd.append("productDiscount", discont);
      fd.append("productCountInStock", countInStock);

      const response = await axios.post(
        "http://localhost:8000/addProduct",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminLoggedIn.Token}`,
          },
        }
      );
      if (response) {
        toast("Product Added Successfully");
        setModalData({
          Header: "Product Added Successfull",
          Data: "You are re directing to main page",
        });
        await setTimeout(() => {
          history("/adminHome");
        }, 3000);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////////////
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === true) {
      placeOrderFunction(event);
    }

    setValidated(true);
  };

  return (
    <Container>
      <h1>Upload A Product</h1>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {error !== null ? <Alert variant="danger">{error}</Alert> : null}
      {modalData && (
        <Modal show={true} centered style={{ color: "#40C96F" }}>
          <Modal.Header>
            <h3>{modalData.Header}</h3>
          </Modal.Header>
          <Modal.Body>
            <h5>{modalData.Data}</h5>
          </Modal.Body>
        </Modal>
      )}
      <div style={{ textAlign: "-webkit-center" }}>
        <Form noValidate validated={validated}>
          <Card style={{ width: "50%", padding: "2rem", margin: "3rem" }}>
            <Row>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Product Name &nbsp;&nbsp;&nbsp;</h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Name
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Description </h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={Description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Description
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Brand</h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="text"
                    placeholder="Brand"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={brand}
                    onChange={(e) => setbrand(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Brand
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Catagory</h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="text"
                    placeholder="Catagory"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={catagory}
                    onChange={(e) => setcatagory(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Catagory
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Price </h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="Number"
                    placeholder="Price"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Price
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Discont </h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="range"
                    value={discont}
                    onChange={(e) => setdiscont(e.target.value)}
                  />

                  <h5>{discont}%</h5>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Count In Stock</h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="Number"
                    placeholder="Count In Stock"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={countInStock}
                    onChange={(e) => setcountInStock(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter product Count.
                  </Form.Control.Feedback>
                </Col>
              </div>
              <div id="flexDiv">
                <Col md="5" id="textCenter">
                  <h4>Upload Image</h4>
                </Col>
                <Col md="7">
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    required
                    onChange={(e) => setproductImage(e.target.files[0])}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Upload product Image
                  </Form.Control.Feedback>
                </Col>
              </div>
              <Button
                style={{ width: "50%", margin: "20px auto" }}
                variant="outline-success"
                onClick={(event) => {
                  handleSubmit(event);
                }}
              >
                Add product
              </Button>
            </Row>
          </Card>
        </Form>
      </div>
    </Container>
  );
};
