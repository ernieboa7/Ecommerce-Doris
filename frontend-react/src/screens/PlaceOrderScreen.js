

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  useEffect(() => {
    if (!shipping?.address) {
      navigate("/shipping");
    } else if (!payment?.paymentMethod) {
      navigate("/payment");
    }
  }, [shipping, payment, navigate]);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      })
    );
  };

  useEffect(() => {
    if (success && order?._id) {
      navigate(`/order/${order._id}`);
    }
  }, [success, order, navigate]);

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row className="mt-4">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
                {shipping.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>{payment.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product} className="d-flex align-items-center">
                      <Image src={item.image} alt={item.name} fluid rounded style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                      <div className="ms-3 flex-grow-1">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <div>Qty: {item.qty}</div>
                      </div>
                      <div>${item.price.toFixed(2)}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <div>Items</div>
                <div>${itemsPrice.toFixed(2)}</div>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <div>Shipping</div>
                <div>${shippingPrice.toFixed(2)}</div>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <div>Tax</div>
                <div>${taxPrice.toFixed(2)}</div>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <div>Total</div>
                <div>${totalPrice.toFixed(2)}</div>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderScreen;

