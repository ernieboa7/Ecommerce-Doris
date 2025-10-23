import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";

// Admin Route
import AdminRoute from "./components/AdminRoute";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Button variant="outline-light" onClick={() => setShowSidebar(true)}>
            &#9776;
          </Button>
          <LinkContainer to="/">
            <Navbar.Brand className="ms-3">Doris Online Boutique</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <LinkContainer to="/profile">
                  <Nav.Link>{userInfo.name}</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              )}

              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SIDEBAR */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} backdrop>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <LinkContainer to="/category/Pants">
              <Nav.Link onClick={() => setShowSidebar(false)}>Pants</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Shirts">
              <Nav.Link onClick={() => setShowSidebar(false)}>Shirts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Sack Bags">
              <Nav.Link onClick={() => setShowSidebar(false)}>Sack Bags</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Hand Bags">
              <Nav.Link onClick={() => setShowSidebar(false)}>Hand Bags</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Sandals">
              <Nav.Link onClick={() => setShowSidebar(false)}>Sandals</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Belts">
              <Nav.Link onClick={() => setShowSidebar(false)}>Belts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/category/Shoes">
              <Nav.Link onClick={() => setShowSidebar(false)}>Shoes</Nav.Link>
            </LinkContainer>
            
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* MAIN CONTENT */}
      <Container className="mb-5">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/orders" element={<AdminRoute><OrdersScreen /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductsScreen /></AdminRoute>} />

          {/* User Routes */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/signin/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />

          {/* Auth */}
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* Product & Cart */}
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />

          {/* Home & Categories */}
          <Route path="/category/:id" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Container>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-3">
        <Container>Contact Customer Care: +353 123456789.</Container>
      </footer>
    </>
  );
}

export default App;
