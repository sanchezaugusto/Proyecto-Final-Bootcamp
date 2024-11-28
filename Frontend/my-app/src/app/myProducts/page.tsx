"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string[];
  salers_id: string;
  category_id: string;
  subCategory_id: string;
}

const MyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Reemplaza esta URL con la URL de tu API
    fetch('http://localhost:5000/api/products/myProducts/673d10ec57366646c59afbb8')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/api/products/EditProduct/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Mis Productos</h2>
      <ul className="space-y-4">
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center">
                <img src={product.image[0]} alt={product.name} className="w-24 h-24 rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                  <p className="text-gray-600">Precio: ${product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleEdit(product._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Editar
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No se encontraron productos.</p>
        )}
      </ul>
    </div>
  );
};

export default MyProducts;