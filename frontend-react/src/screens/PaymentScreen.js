/*

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate('/placeorder'); // 
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
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

export default PaymentScreen;
*/


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <Container className="mt-4">
      <CheckoutSteps step1 step2 step3 />

      <h2 className="mb-4">Payment Method</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            label="PayPal"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>

        {/* Add more payment methods if needed in future */}
        {/* <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            label="Stripe"
            id="stripe"
            name="paymentMethod"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group> */}

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </Container>
  );
}

export default PaymentScreen;

