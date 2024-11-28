"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";

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
    fetch("http://localhost:5000/api/products/myProducts/673d10ec57366646c59afbb8")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/myProducts/${id}`);
  };

  const columns = [
    {
      name: "Imagen",
      selector: (row: Product) =>
        row.image[0] ? (
          <img
            src={row.image[0]}
            alt={row.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        ),
      center: true,
      grow: 0,
      omit: window.innerWidth <= 768, // Ocultar columna en dispositivos pequeños
    },
    {
      name: "Nombre",
      selector: (row: Product) => row.name,
      sortable: true,
      wrap: true, // Permitir que el texto se ajuste
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock,
      sortable: true,
      center: true,
    },
    {
      name: "Precio",
      selector: (row: Product) => `$${row.price}`,
      sortable: true,
      center: true,
    },
    {
      name: "Acciones",
      selector: (row: Product) => (
        <button
          onClick={() => handleEdit(row._id)}
          className="px-4 py-2 bg-[#2a2a2a] text-white rounded-md hover:bg-gray-800"
        >
          Editar
        </button>
      ),
      center: true,
      grow: 0,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // Altura mínima de filas
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f3f4f6",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        wordBreak: "break-word", // Ajuste de texto para pantallas pequeñas
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto my-auto px-4 py-10 text-slate-900">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Mis Productos
      </h2>
      {products.length > 0 ? (
        <DataTable
          columns={columns}
          data={products}
          pagination
          responsive
          highlightOnHover
          customStyles={customStyles}
        />
      ) : (
        <p className="text-center text-gray-600">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default MyProducts;
