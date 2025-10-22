






// src/screens/ProductsScreen.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import axios from "axios";
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from "../actions/productActions";

function ProductsScreen() {
  const [showModal, setShowModal] = useState(false);
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } =
    productDelete;

  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } =
    productSave;

  useEffect(() => {
    if (successSave || successDelete) {
      setShowModal(false);
      dispatch(listProducts());
    }
  }, [successSave, successDelete, dispatch]);

  const openModal = (product = {}) => {
    setShowModal(true);
    setId(product._id || "");
    setName(product.name || "");
    setPrice(product.price || 0);
    setImage(product.image || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setCountInStock(product.countInStock || 0);
    setDescription(product.description || "");
  };

  // Handle image file upload
  /*
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  */

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImage(data.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed. Check console.");
    } finally {
      setUploading(false);
    }
  };








  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center justify-content-between">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => openModal({})}>
            + Create Product
          </Button>
        </Col>
      </Row>

      {/* Alerts */}
      {loadingDelete && <Spinner animation="border" size="sm" />}
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
      {loadingSave && <Spinner animation="border" size="sm" />}
      {errorSave && <Alert variant="danger">{errorSave}</Alert>}

      {/* Product Table */}
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => openModal(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{_id ? "Edit Product" : "Create Product"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {uploading && <p>Uploading...</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {_id ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ProductsScreen;
