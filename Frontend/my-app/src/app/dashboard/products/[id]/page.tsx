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
    return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;
  }

  return (
    <div className='bg-gray-100'>
      <div className="bg-[#fff] max-w-4xl my-14 mx-auto p-6  rounded-2xl">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="grid grid-cols-2 gap-4">
            {formData.image &&
              formData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product"
                  className="w-24 h-24 md:w-48 md:h-48 rounded-xl object-cover ring-2 ring-gray-200 shadow-md"
                />
              ))}
          </div>
          {editMode && (
            <div className="flex flex-col mt-4 md:mt-0 md:ml-8 space-y-3">
              <label className="text-sm font-semibold text-gray-600">
                Subir imágenes
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full px-4 py-2 text-sm text-gray-700 border-2 border-dashed border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">{product.name}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            {editMode ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {product.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Stock
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{product.stock}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Precio
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  ${product.price}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Categoría
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {product.category_id}
                </p>
              )}
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Subcategoría
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="subCategory_id"
                  value={formData.subCategory_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {product.subCategory_id}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Vendedor
            </label>
            {editMode ? (
              <input
                type="text"
                name="salers_id"
                value={formData.salers_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">{product.salers_id}</p>
            )}
          </div>
        </div>

        {editMode && (
          <div className="flex justify-end mt-8 space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#2a2a2a] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a2a2a99]"
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        )}
        {!editMode && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Volver
            </button>
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-[#2a2a2a] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a2a2a]"
            >
              Editar Producto
            </button>
          </div>
        )}
      </div>
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