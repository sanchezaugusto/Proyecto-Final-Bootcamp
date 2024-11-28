"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
  const {data: session, status} = useSession()
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const userId = session?.user.userId
  useEffect(() => {
    console.log(status)
    if(status == "loading" || status == "unauthenticated"){
      console.log("hola")
      return
    }
    // Reemplaza esta URL con la URL de tu API
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/myProducts/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          console.log(data, userId, status)
          setProducts(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [status, userId]);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/products/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto my-auto py-10 text-slate-900">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Mis Productos</h2>
      <ul className="space-y-4">
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center">
                {product.image[0] ? (
                  <img src={product.image[0]} alt={product.name} className="w-24 h-24 rounded-lg mr-4" />
                ) : (
                  <div className="w-24 h-24 rounded-lg mr-4 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  {/* <p className="text-gray-600">{product.description}</p> */}
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