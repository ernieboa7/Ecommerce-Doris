/*

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function ProductScreen() {
  const { id } = useParams(); // v6 uses useParams()
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(id));
  }, [dispatch, id, productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(id, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>${(product?.price || 0).toFixed(2)}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>

            <div className="details-action">
              <ul>
                <li>Price: ${(product?.price || 0).toFixed(2)}
</li>
                <li>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>

                {product.countInStock > 0 && (
                  <>
                    <li>
                      Qty:{" "}
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li>
                      <button
                        onClick={handleAddToCart}
                        className="button primary"
                      >
                        Add to Cart
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews?.length && <div>There are no reviews</div>}

            <ul className="review" id="reviews">
              {product.reviews?.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating} />
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}

              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excellent</option>
                        </select>
                      </li>

                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>

                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductScreen;

*/

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(id));
  }, [dispatch, id, productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(id, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container className="mt-4">
      <Link className="btn btn-light mb-3" to="/">
        &larr; Back to Results
      </Link>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price: </strong>${product.price?.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price?.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="w-100"
                      onClick={handleAddToCart}
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* REVIEWS */}
          <Row className="mt-5">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews?.length === 0 && <Alert>No reviews yet.</Alert>}

              <ListGroup variant="flush">
                {product.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a Customer Review</h4>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Alert variant="info">
                      Please <Link to="/signin">sign in</Link> to write a review.
                    </Alert>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default ProductScreen;
