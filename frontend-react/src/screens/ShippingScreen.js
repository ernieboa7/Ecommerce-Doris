/*

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;

  const [address, setAddress] = useState(shipping.address || "");
  const [city, setCity] = useState(shipping.city || "");
  const [postalCode, setPostalCode] = useState(shipping.postalCode || "");
  const [country, setCountry] = useState(shipping.country || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      setError("All fields are required.");
    } else {
      setError("");
      dispatch(saveShipping({ address, city, postalCode, country }));
      navigate("/payment");
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            {error && <li style={{ color: "red" }}>{error}</li>}

            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                placeholder="Enter your address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </li>

            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                placeholder="Enter your city"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </li>

            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                placeholder="Enter postal code"
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </li>

            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                placeholder="Enter your country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
*/

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;

  const [address, setAddress] = useState(shipping.address || "");
  const [city, setCity] = useState(shipping.city || "");
  const [postalCode, setPostalCode] = useState(shipping.postalCode || "");
  const [country, setCountry] = useState(shipping.country || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      setError("All fields are required.");
    } else {
      setError("");
      dispatch(saveShipping({ address, city, postalCode, country }));
      navigate("/payment");
    }
  };

  return (
    <Container className="mt-4">
      <CheckoutSteps step1 step2 />

      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={6}>
          <h2>Shipping Address</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="postalCode" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="country" className="mb-4">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Continue
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ShippingScreen;
