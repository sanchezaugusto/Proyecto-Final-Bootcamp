"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  category_id: string;
  subCategory_id?: string;
  salers_id: string;
  image: string[];
}

const ProductCard: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setFormData(data);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          image: files.map(file => URL.createObjectURL(file)),
        }));
      };
      files.forEach(file => reader.readAsDataURL(file));
    }
  };

  const handleSave = () => {
    if (product) {
      const updatedData = {
        _id: product._id,
        name: formData.name || '',
        description: formData.description || '',
        stock: formData.stock || 0,
        price: formData.price || 0,
        image: formData.image || [],
        salers_id: formData.salers_id || '',
        category_id: formData.category_id || '',
        subCategory_id: formData.subCategory_id || '',
      };

      console.log('JSON to be sent:', JSON.stringify(updatedData, null, 2)); // Log the JSON before sending

      fetch(`http://localhost:5000/api/products/editProduct/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
        })
        .then(data => {
          setProduct(data);
          setEditMode(false);
        })
        .catch(error => {
          console.error('Error updating product data:', error);
          alert(`Error updating product data: ${error.message}`);
        });
    }
  };

  const handleCancel = () => {
    if (product) {
      setFormData(product);
      setEditMode(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        {formData.image && formData.image.map((img, index) => (
          <img key={index} src={img} alt="Product" className="w-24 h-24 rounded-full mr-4" />
        ))}
        {editMode && (
          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        {editMode ? (
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.description}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Stock</label>
        {editMode ? (
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.stock}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Precio</label>
        {editMode ? (
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.price}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Categoría</label>
        {editMode ? (
          <input
            type="text"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.category_id}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subcategoría</label>
        {editMode ? (
          <input
            type="text"
            name="subCategory_id"
            value={formData.subCategory_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.subCategory_id}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vendedor</label>
        {editMode ? (
          <input
            type="text"
            name="salers_id"
            value={formData.salers_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          <p className="text-gray-800">{product.salers_id}</p>
        )}
      </div>
      {editMode && (
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button
            onClick={handleCancel}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      )}
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Editar Producto
        </button>
      )}
      <button
        onClick={handleBack}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Volver
      </button>
    </div>
  );
};

async function fetchProductById(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default ProductCard;