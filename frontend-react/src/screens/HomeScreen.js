

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Container,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const { id: category = '' } = useParams();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    dispatch(listProducts(category, searchKeyword, newSortOrder));
  };

  return (
    <Container>
      {category && <h2 className="my-4 text-capitalize">{category}</h2>}

      <Form onSubmit={submitHandler} className="mb-4">
        <Row className="align-items-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search products"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={sortOrder} onChange={sortHandler}>
              <option value="">Sort by: Newest</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Link to={`/product/${product._id}`}>
                  <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title as="div">
                    <strong>
                      <Link to={`/product/${product._id}`} className="text-dark">
                        {product.name}
                      </Link>
                    </strong>
                  </Card.Title>

                  <Card.Text as="div">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </Card.Text>

                  <Card.Text as="h5" className="mt-2">
                    €{product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomeScreen;
