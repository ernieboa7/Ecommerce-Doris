


import React, { useState } from "react";

function ImageUpload({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    //  Use your ImgBB API key (store it in .env)
    const API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.data.url;
      console.log("✅ Uploaded Image URL:", imageUrl);

      if (onUpload) onUpload(imageUrl); // Pass URL to parent
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed. Check console/logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="form-label fw-bold">Product Image</label>
      <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} />
      {loading && <p>Uploading image...</p>}
    </div>
  );
}

export default ImageUpload;
