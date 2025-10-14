/*

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>

          <li>
            {message && <div style={{ color: "red" }}>{message}</div>}
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </li>

          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={rePassword}
              placeholder="Re-enter your password"
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </li>

          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>

          <li>
            Already have an account?{" "}
            <Link
              to={redirect === "/" ? "/signin" : `/signin?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Sign-In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;


*/

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Create Account</h2>

          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && (
            <div className="d-flex justify-content-center mb-3">
              <Spinner animation="border" />
            </div>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rePassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={rePassword}
                placeholder="Re-enter your password"
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button type="submit" variant="primary">
                Register
              </Button>
            </div>
          </Form>

          <div className="text-center">
            Already have an account?{" "}
            <Link
              to={redirect === "/" ? "/signin" : `/signin?redirect=${redirect}`}
            >
              Sign In
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterScreen;
