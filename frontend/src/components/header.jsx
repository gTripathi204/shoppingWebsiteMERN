import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../reducers/userReducer";
import { deleteUserDetails } from "../reducers/userAllInfoReducer";
import { deleteAddAllOrders } from "../reducers/ordersReducers";
import { removeAdminLogin } from "../reducers/adminReducers/adminReducer";

function NavScrollExample() {
  const user = useSelector((state) => state.user);
  const { userLoggedIn, userLoggedInLoading } = user;
  const admin = useSelector((state) => state.admin);
  const { adminLoggedIn } = admin;
  const dispatch = useDispatch();
  const history = useNavigate();

  const logoutHandler = () => {
    history("/products");
    dispatch(removeAdminLogin());
    dispatch(userLogout());
    dispatch(deleteUserDetails());
    dispatch(deleteAddAllOrders());
  };

  const redirectFromLogoHandler = () => {
    if(adminLoggedIn){
      return "/adminHome" ;
    } 
    else {
      return "/products"
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="headerFormat">
      <Container fluid>
        <LinkContainer to={redirectFromLogoHandler()}>
          <Navbar.Brand>
            <h1>Online Shop</h1>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav className="ml-auto">
          <LinkContainer to={"/cart"}>
            <Nav.Link>
              {" "}
              <FontAwesomeIcon icon={faCartShopping} /> &nbsp; cart
            </Nav.Link>
          </LinkContainer>

          {userLoggedIn ? (
            <NavDropdown title={userLoggedIn.name} id="username">
              <LinkContainer to="/userProfile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/MyOrders">
                <NavDropdown.Item>My Orders</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : adminLoggedIn ? (
            <NavDropdown title="Admin" id="username">
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to={"/login"}>
              <Nav.Link>
                <FontAwesomeIcon icon={faRightToBracket} /> signIn
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
