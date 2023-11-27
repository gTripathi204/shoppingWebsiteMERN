import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addAllPendingOrders } from "../../reducers/adminReducers/adminAllPendingorder";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Col, Container, Dropdown } from "react-bootstrap";
import { LoaderAnimation } from "../../components/shared/loader";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { Alert } from "react-bootstrap";
import Popup from "reactjs-popup";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  ORDER_SHIPPED,
  ORDER_DELIVERED,
  ORDER_OUT_FOR_DELIVERY,
  ORDER_PLACED,
  ORDER_CANCELLED,
} from "../../constents/orderConstents";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminPendingOrderScreen = () => {
  const admin = useSelector((state) => state.admin);
  const { adminLoggedIn } = admin;

  const orders = useSelector((state) => state.pendingOrders);
  const { adminAllPlendingOrders } = orders;

  let [showModal, setshowModal] = useState(false);
  let [updationData, setsetUpdationData] = useState("");
  const dispatch = useDispatch();

  const orderFatchFun = async () => {
    const response = await axios.get("http://localhost:8000/allPendingOrders", {
      headers: {
        Authorization: `Bearer ${adminLoggedIn.Token}`,
      },
    });

    if (response) {
      const data = response.data;
      await dispatch(addAllPendingOrders(data));
    }
  };

  useEffect(() => {
    if (adminAllPlendingOrders.length === 0) {
      orderFatchFun();
    }
  }, []);

  const OnChnageStatusFunction = async (data) => {
    setshowModal(true);
    setsetUpdationData(data);
    console.log(data);
  };

  const updateDataHandler = async () => {
    const response = await axios.post(
      `/updateDeliveryStatus/${updationData.id}`,
      { updatedStatus: `${updationData.action}` },
      {
        headers: {
          Authorization: `Bearer ${adminLoggedIn.Token}`,
        },
      }
    );

    if (response) {
      console.log(response);
      orderFatchFun();
      setshowModal(false);
      toast(`The Status is updated to ${updationData.action} Successfully!`);
    } else {
      console.log("data not updated");
      setshowModal(false);
    }
  };

  return (
    <>
      {adminAllPlendingOrders.length === 0 ? (
        <Container>
          <Alert>
            <h1>There is no pending orders</h1>
          </Alert>
        </Container>
      ) : (
        <div>
          <Container>
            <Card id="adminCardHeading">
              <Row style={{ margin: "auto 0 auto 0" }}>
                <Col md="2" id="textAlignCenter">
                  <h5>OrderId</h5>
                </Col>
                <Col md="2" id="textAlignCenter">
                  <h5>Name Of Products</h5>
                </Col>
                <Col md="2" id="textAlignCenter">
                  <h5>Payment Method</h5>
                </Col>
                <Col md="2" id="textAlignCenter">
                  <h5>Total Price</h5>
                </Col>
                <Col md="2" id="textAlignCenter">
                  <h5>Delivery Status</h5>
                </Col>
                <Col md="2" id="textAlignCenter">
                  <h5>Update Delivery Status</h5>
                </Col>
              </Row>
            </Card>
          </Container>
          {adminAllPlendingOrders.map((data) => {
            return (
              <Container>
                {showModal === true ? (
                  <>
                    <Modal
                      show={showModal}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header>
                        <Modal.Title>Updation Warning</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>OrderID : {updationData.id}</p>
                        <h5>
                          Change order status as : {`${updationData.action}`}
                        </h5>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          name="close"
                          variant="secondary"
                          onClick={() => setshowModal(false)}
                        >
                          Close
                        </Button>
                        <Button
                          name="save"
                          variant="primary"
                          onClick={() => updateDataHandler()}
                        >
                          Update Status
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                ) : null}
                <ToastContainer />
                <Card id="adminCardData">
                  <Row style={{ margin: "auto 0 auto 0" }}>
                    <Col md="2" id="textAlignCenter">
                      <p style={{ fontWeight: "bold" }}>{data._id}</p>
                    </Col>
                    <Col md="2" id="textAlignCenter">
                      {data.orderItems.map((data) => {
                        return (
                          <>
                            <p style={{ fontWeight: "bold" }}>{data.name}</p>
                            <p style={{ fontWeight: "bold" }}>
                              Quentity : {data.productQuantity}
                            </p>
                          </>
                        );
                      })}
                    </Col>
                    <Col md="2" id="textAlignCenter">
                      <p style={{ fontWeight: "bold" }}>{data.paymentMode}</p>
                    </Col>
                    <Col md="2" id="textAlignCenter">
                      <p style={{ fontWeight: "bold" }}>
                        ₹&nbsp;{data.totalPrice}
                      </p>
                    </Col>
                    <Col md="2" id="textAlignCenter">
                      <p style={{ fontWeight: "bold" }}>
                        {data.deliveryStatus}
                      </p>
                    </Col>
                    <Col md="2" id="textAlignCenter">
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ backgroundColor: "#00cc00", color: "black" }}
                          id="dropdown-basic"
                        >
                          Update Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              OnChnageStatusFunction({
                                id: data._id,
                                action: `${ORDER_SHIPPED}`,
                              })
                            }
                          >
                            {ORDER_SHIPPED}
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={() =>
                              OnChnageStatusFunction({
                                id: data._id,
                                action: `${ORDER_OUT_FOR_DELIVERY}`,
                              })
                            }
                          >
                            {ORDER_OUT_FOR_DELIVERY}
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-3"
                            onClick={() =>
                              OnChnageStatusFunction({
                                id: data._id,
                                action: `${ORDER_DELIVERED}`,
                              })
                            }
                          >
                            {ORDER_DELIVERED}
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-3"
                            onClick={() =>
                              OnChnageStatusFunction({
                                id: data._id,
                                action: `${ORDER_CANCELLED}`,
                              })
                            }
                          >
                            Cancelled
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>

                  <div
                    id="verticalLine"
                    style={{ borderTop: "3px solid white" }}
                  ></div>
                  <div>
                    <div id="flexDiv">
                      <p style={{ fontWeight: "bold", margin: "0" }}>
                        Address&nbsp;&nbsp;:&nbsp;&nbsp;
                      </p>
                      <p style={{ margin: "0" }}>
                        {" "}
                        {data.shippingAddress.address}
                      </p>
                    </div>
                    <div id="flexDiv">
                      <p style={{ fontWeight: "bold", margin: "0" }}>
                        City&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </p>
                      <p style={{ margin: "0" }}>
                        {" "}
                        {data.shippingAddress.city}
                      </p>
                    </div>
                    <div id="flexDiv">
                      <p style={{ fontWeight: "bold", margin: "0" }}>
                        Pincode&nbsp;&nbsp;:&nbsp;&nbsp;
                      </p>
                      <p style={{ margin: "0" }}>
                        {" "}
                        {data.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>
                </Card>
              </Container>
            );
          })}
        </div>
      )}
    </>
  );
};
