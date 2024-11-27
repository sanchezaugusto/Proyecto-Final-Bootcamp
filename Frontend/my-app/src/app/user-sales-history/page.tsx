"use client"
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

interface Product {
  id: string;
  quantity: number;
  sub_total: number;
}

interface Sale {
  _id: string;
  user_id: {
    _id: string;
    email: string;
  };
  products: Product[];
  createdAt: string;
}

const SalesStatistics: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    // Reemplaza esta URL con la URL de tu API
    fetch('http://localhost:5000/api/orders/salesHistory/673d10ec57366646c59afbb8')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const groupedData = salesData.reduce((acc, sale) => {
    const date = new Date(sale.createdAt);
    const day = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    if (!acc[day]) {
      acc[day] = { date: day, total: 0, quantity: 0 };
    }
    acc[day].total += sale.products.reduce((sum, product) => sum + product.sub_total, 0);
    acc[day].quantity += sale.products.reduce((sum, product) => sum + product.quantity, 0);
    return acc;
  }, {} as Record<string, { date: string; total: number; quantity: number }>);

  const days = Object.keys(groupedData);

  const filteredData = selectedMonth ? days.filter(day => day.includes(selectedMonth)).map(day => groupedData[day]) : Object.values(groupedData);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Estadísticas de Ventas</h2>
      <div className="flex justify-center mb-6">
        <div className="mr-4">
          <label className="block text-gray-700">Seleccionar Mes</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Todos los Meses</option>
            {Array.from(new Set(days.map(day => day.split(' ')[1] + ' ' + day.split(' ')[2]))).map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8">
              <LabelList dataKey="total" position="top" />
            </Bar>
            <Bar dataKey="quantity" fill="#82ca9d">
              <LabelList dataKey="quantity" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="quantity" stroke="#82ca9d" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesStatistics;