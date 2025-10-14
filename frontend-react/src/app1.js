

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

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
import AdminRoute from './components/AdminRoute.js';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Susan Online Boutique</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>

            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <button className="dropbtn">Admin &#9662;</button>
                <ul className="dropdown-content">
                  <li><Link to="/admin/orders">Orders</Link></li>
                  <li><Link to="/admin/products">Products</Link></li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li><Link to="/category/Pants">Pants</Link></li>
            <li><Link to="/category/Shirts">Shirts</Link></li>
            <li><Link to="/category/Sack Bags">Sack Bags</Link></li>
            <li><Link to="/category/Hand Bags">Hand Bags</Link></li>
            <li><Link to="/category/Sandals">Sandals</Link></li>
            <li><Link to="/category/Belts">Belts</Link></li>
            
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Routes>

              {/* Admin Routes */}
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrdersScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductsScreen />
                  </AdminRoute>
                }
              />

              {/* User Routes */}
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/signin/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />

              {/*Auth Routes */} 
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/register" element={<RegisterScreen />} />

              {/* Product & Cart */}
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />

              {/* Home & Categories */}
              <Route path="/category/:id" element={<HomeScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

