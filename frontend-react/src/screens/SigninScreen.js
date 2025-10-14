/*
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  // Handle redirection from query string or location.state
  const queryParams = new URLSearchParams(location.search);
  const redirectFromQuery = queryParams.get("redirect");
  const redirectFromState = location.state?.from;
  const redirect = redirectFromQuery || redirectFromState || "/";
  const accessDenied = queryParams.get("accessDenied");

  

  // Redirect after login
  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.isAdmin) {
      navigate("/products");
    } else {
      navigate(redirect || "/");
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li><h2>Sign In</h2></li>

          {accessDenied && (
            <li>
              <div className="alert alert-warning">
                Admin access required. Please sign in as an administrator.
              </div>
            </li>
          )}

          {loading && (
            <li><div className="alert alert-info">Loading, please wait...</div></li>
          )}

          {error && (
            <li>
              <div className="alert alert-danger">
                {error === "Request failed with status code 401"
                  ? "Incorrect password."
                  : error === "Request failed with status code 404"
                  ? "User does not exist. Please register first."
                  : error}
              </div>
            </li>
          )}

          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>

          <li>
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈 Hide" : "👁️ Show"}
              </button>
            </div>
          </li>

          <li>
            <button type="submit" className="button primary block">
              Sign In
            </button>
          </li>

          <li className="text-center">
            <p>New User?</p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="button secondary text-center"
            >
              Create Your Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
*/



import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  // Redirection logic
  const queryParams = new URLSearchParams(location.search);
  const redirectFromQuery = queryParams.get("redirect");
  const redirectFromState = location.state?.from;
  const redirect = redirectFromQuery || redirectFromState || "/";
  const accessDenied = queryParams.get("accessDenied");

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate("/products");
      } else {
        navigate(redirect || "/");
      }
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Sign In</h2>

          {accessDenied && (
            <Alert variant="warning">
              Admin access required. Please sign in as an administrator.
            </Alert>
          )}

          {loading && <Alert variant="info">Loading, please wait...</Alert>}

          {error && (
            <Alert variant="danger">
              {error === "Request failed with status code 401"
                ? "Incorrect password."
                : error === "Request failed with status code 404"
                ? "User does not exist. Please register first."
                : error}
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>

            <div className="text-center">
              <p className="mb-2">New User?</p>
              <Link
                to={
                  redirect
                    ? `/register?redirect=${redirect}`
                    : "/register"
                }
                className="btn btn-secondary"
              >
                Create Your Account
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SigninScreen;
