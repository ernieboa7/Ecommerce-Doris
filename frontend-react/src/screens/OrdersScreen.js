/*

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen() {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders = [] } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.user?.name || "N/A"}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.paidAt ? new Date(order.paidAt).toLocaleDateString() : "-"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "-"}</td>
                <td>
                  //{/* ✅ Link works fine in v6 
                  <Link to={`/order/${order._id}`} className="button secondary">
                    Details
                  </Link>{" "}
                  <button
                    type="button"
                    onClick={() => deleteHandler(order)}
                    className="button secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersScreen;
*/


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Button,
  Container,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders = [] } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Orders</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>€{order.totalPrice.toFixed(2)}</td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                <td>
                  {order.paidAt
                    ? new Date(order.paidAt).toLocaleDateString()
                    : '-'}
                </td>
                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                <td>
                  {order.deliveredAt
                    ? new Date(order.deliveredAt).toLocaleDateString()
                    : '-'}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="info" size="sm" className="me-2">
                      Details
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrdersScreen;
