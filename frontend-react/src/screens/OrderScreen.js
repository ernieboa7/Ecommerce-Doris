/*

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';

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
      navigate("/profile");
    } else {
      dispatch(detailsOrder(orderId));
    }
  }, [successPay, dispatch, orderId, navigate]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>No order found.</div>;

  return (
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>Shipping</h3>
          <div>
            {order.shipping.address}, {order.shipping.city},{" "}
            {order.shipping.postalCode}, {order.shipping.country}
          </div>
          <div>
            {order.isDelivered
              ? `Delivered at ${order.deliveredAt}`
              : "Not Delivered."}
          </div>
        </div>

        <div>
          <h3>Payment</h3>
          <div>Payment Method: {order.payment.paymentMethod}</div>
          <div>
            {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid."}
          </div>
        </div>

        <div>
          <ul className="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {order.orderItems.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              order.orderItems.map((item) => (
                <li key={item._id}>
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>Qty: {item.qty}</div>
                  </div>
                  <div className="cart-price">${item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="placeorder-action">
        <ul>
          <li className="placeorder-actions-payment">
            {loadingPay && <div>Finishing Payment...</div>}
            {!order.isPaid && (
              <PaypalButton
                amount={order.totalPrice}
                onSuccess={handleSuccessPayment}
              />
            )}
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${order.itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${order.shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${order.taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${order.totalPrice}</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderScreen;

*/


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { detailsOrder, payOrder } from '../actions/orderActions';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
