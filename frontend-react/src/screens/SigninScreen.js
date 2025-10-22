



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
        navigate("/profile");
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
