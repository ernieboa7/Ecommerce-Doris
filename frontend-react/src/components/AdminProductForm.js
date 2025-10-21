/*

import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/api"; //  use centralized axios instance

function AdminProductForm({ product, onSave }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || "");
  const [uploading, setUploading] = useState(false);

  //  Get logged-in user (to get the token)
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin || {};

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      //  Upload to backend /api/upload (NOT /api/uploads)
      const { data } = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo?.token}`, //  auth required for admin route
        },
      });

      //  Set Cloudinary URL returned from backend
      setImage(data.url);
      setUploading(false);
      alert(" Image uploaded successfully!");
    } catch (error) {
      console.error(" Upload failed:", error);
      alert(" Upload failed. Check console/logs.");
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, price, image }); //  Pass uploaded Cloudinary URL
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "auto", textAlign: "left" }}
    >
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Will be filled automatically after upload"
        />
      </div>

      <div>
        <label>Upload Image</label>
        <input type="file" onChange={handleFileUpload} />
        {uploading && <p>Uploading...</p>}
      </div>

      {image && (
        <div style={{ marginTop: "10px" }}>
          <img src={image} alt="preview" width="120" />
          <p>Cloudinary URL:</p>
          <a href={image} target="_blank" rel="noopener noreferrer">
            {image}
          </a>
        </div>
      )}

      <button type="submit" style={{ marginTop: "10px" }}>
        Save Product
      </button>
    </form>
  );
}

export default AdminProductForm; */



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/api";
import { saveProduct } from "../actions/productActions";

function AdminProductForm() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin || {};

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  //  Automatically uploads file to Cloudinary through backend
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      //  Call backend /api/upload (with admin auth)
      const { data } = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      //  Set the Cloudinary URL
      setImage(data.url);
      setUploading(false);
      alert(" Image uploaded successfully!");
    } catch (error) {
      console.error(" Upload failed:", error);
      alert(" Upload failed. Check console/logs.");
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      return alert(" Please fill all required fields and upload an image.");
    }

    //  Dispatch product save with uploaded Cloudinary image URL
    const product = {
      name,
      price,
      image,
      category,
      description,
    };

    dispatch(saveProduct(product));
    alert(" Product saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "auto", textAlign: "left" }}
    >
      <h2>Create New Product</h2>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price (€)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Electronics"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Product Image</label>
        <input type="file" onChange={handleFileChange} />
        {uploading && <p>Uploading image...</p>}
      </div>

      {image && (
        <div style={{ marginTop: "10px" }}>
          <img src={image} alt="preview" width="120" />
          <p>
            Cloudinary URL:{" "}
            <a href={image} target="_blank" rel="noopener noreferrer">
              {image}
            </a>
          </p>
        </div>
      )}

      <button
        type="submit"
        style={{ marginTop: "15px", padding: "8px 16px", cursor: "pointer" }}
      >
        Save Product
      </button>
    </form>
  );
}

export default AdminProductForm;

