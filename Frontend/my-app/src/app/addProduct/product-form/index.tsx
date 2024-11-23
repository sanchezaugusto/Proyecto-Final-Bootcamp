"use client"
import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);

    if (images) {
      for (let i = 0; i < images.length && i < 5; i++) {
        formData.append('image', images[i]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/products/addProduct', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Stock:
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Images:
          <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
        </label>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;