"use client"
import React, { useState } from 'react';
import './index.css';

const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);

      // Crear URLs temporales para previsualización
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

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

    console.log(formData);
    console.log(`${process.env.NEXT_PUBLIC_API_HOST}/products/addProduct`);
    
    
    try {
      const response = await fetch("http://localhost:5000/api/products/addProduct", {
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
    <form onSubmit={handleSubmit} className="grid-form">
      <div className="form-column">
        <label className="text-sm font-medium text-gray-700">
          Name:
          <input
            className="mb-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Description:
          <input
            className="mb-2"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div className="form-column">
        <label className="text-sm font-medium text-gray-700">
          Price:
          <input
            className="mb-2"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Stock:
          <input
            className="mb-2"
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
      </div>

      {/* Sección de imágenes */}
      <div className="form-column col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images:
        </label>

        <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-gray-400 focus-within:border-gray-500 transition">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <svg
              className="mx-auto h-8 w-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 9l-4-4m0 0L8 9m4-4v12"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop files here, or{' '}
              <span className="text-blue-600 underline cursor-pointer">browse</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {/* Grid de imágenes en 2 columnas */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewImages.map((src, index) => (
            <div key={index} className="relative h-24 border rounded overflow-hidden">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botón de enviar */}
      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>

  );
};

export default AddProductForm;
