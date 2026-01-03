


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { detailsOrder, payOrder } from '../actions/orderActions';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import clearCart from "../actions/cartActions"; // CLEAR CART AFTER PAYMENT

function OrderScreen() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    if (successPay) {
      dispatch(clearCart());   // Clear cart after payment success
      navigate('/profile');
    } else {
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, successPay, navigate]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!order) return <Alert variant="warning">No order found.</Alert>;

  const itemsPrice = Number(order.itemsPrice || 0).toFixed(2);
  const shippingPrice = Number(order.shippingPrice || 0).toFixed(2);
  const taxPrice = Number(order.taxPrice || 0).toFixed(2);
  const totalPrice = Number(order.totalPrice || 0).toFixed(2);

  return (
    <Row>
      <Col md={8}>
        {/* Shipping, Payment, Order Items cards remain unchanged */}
      </Col>

      <Col md={4}>
        <Card>
          <Card.Header as="h5">Order Summary</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>€{itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>€{shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>€{taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>
                  <strong>€{totalPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Spinner animation="border" />}
                <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          { amount: { value: totalPrice } },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      handleSuccessPayment(details);
                    }}
                  />
                </PayPalScriptProvider>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderScreen;
