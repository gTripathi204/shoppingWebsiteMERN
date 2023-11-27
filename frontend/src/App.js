import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/footer";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/homeScreen";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";
import ProductDetail from "./screens/productDetails";
import { CartScreen } from "./screens/cartScreen";
import SignInScreen from "./screens/signInScreen";
import SignUPScreen from "./screens/signUPScreen";
import VerifyOTP from "./screens/verifyOTPScreen";
import UserDetailsScreen from "./screens/userDetails";
import { CheckOutScreen } from "./screens/checkOutScreen";
import { OrderPlacedStamp } from "./screens/orderPlacedStamp";
import { MyOrdersScreen } from "./screens/myOrdersScreen";
import { OrderDetailScreen } from "./screens/orderDetailsScreen";
import { AdminSignInScreen } from "./screens/adminScreens.jsx/adminLogin";
import { AdminHomeScreen } from "./screens/adminScreens.jsx/adminHomeScreen";
import { AdminPendingOrderScreen } from "./screens/adminScreens.jsx/adminPendingorderScreen";
import { AdminCompletedOrderScreen } from "./screens/adminScreens.jsx/adminCompletedOrdersScreen";
import { AdminAddProductsScreen } from "./screens/adminScreens.jsx/adminAddProductScreen";
import { AdminAllCancelledScreen } from "./screens/adminScreens.jsx/adminAllCanceledProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/products"
            element={
              <Container>
                <HomeScreen />
              </Container>
            }
          ></Route>
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/cart/:id?" element={<CartScreen />} />
          <Route exact path="/login" element={<SignInScreen />} />
          <Route exact path="/register" element={<SignUPScreen />} />
          <Route exact path="/verifyOTP" element={<VerifyOTP />} />
          <Route exact path="/userProfile" element={<UserDetailsScreen />} />
          <Route exact path="/checkOut" element={<CheckOutScreen />} />
          <Route
            exact
            path="/orderPlacedStamp"
            element={<OrderPlacedStamp />}
          />
          <Route exact path="/MyOrders" element={<MyOrdersScreen />} />
          <Route
            exact
            path="/orderProductDetail"
            element={<OrderDetailScreen />}
          />
          <Route exact path="/adminLogin" element={<AdminSignInScreen/>} />
          <Route exact path="/adminHome" element={<AdminHomeScreen/>} />
          <Route exact path="/adPendingOrders" element={<AdminPendingOrderScreen/>} />
          <Route exact path="/adCompletedOrders" element={<AdminCompletedOrderScreen/>} />
          <Route exact path="/adAddProducts" element={<AdminAddProductsScreen/>} />
          <Route exact path="/adCancelledOrders" element={<AdminAllCancelledScreen/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
