

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const {
    loading: loadingOrders,
    orders = [],
    error: errorOrders,
  } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email || "");
      setName(userInfo.name || "");
      dispatch(listMyOrders());
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* User Profile Form */}
        <Col md={4}>
          <h3>User Profile</h3>
          <Form onSubmit={submitHandler}>
            {loading && <Spinner animation="border" size="sm" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Profile updated successfully.</Alert>}

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="me-2">
              Update
            </Button>

            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Form>
        </Col>

        {/* My Orders */}
        <Col md={8}>
          <h3 className="mb-3">My Orders</h3>
          {loadingOrders ? (
            <Spinner animation="border" />
          ) : errorOrders ? (
            <Alert variant="danger">{errorOrders}</Alert>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid
                        ? order.paidAt?.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button variant="info" size="sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
