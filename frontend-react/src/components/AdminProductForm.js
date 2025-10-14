import React, { useState } from 'react';
import axios from 'axios';

function AdminProductForm({ product, onSave }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || '');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await axios.post('/api/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, price, image }); // call parent save function
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Image</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>

      <div>
        <label>Upload Image</label>
        <input type="file" onChange={handleFileUpload} />
        {uploading && <p>Uploading...</p>}
      </div>

      <button type="submit">Save Product</button>
    </form>
  );
}

export default AdminProductForm;
