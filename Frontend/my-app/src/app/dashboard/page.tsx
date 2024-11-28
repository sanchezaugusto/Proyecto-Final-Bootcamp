"use client"

import Loader from '@/components/loaders/Loader';
import PieChart from '@/components/PieChart';
import TimeSerie from '@/components/TimeSerie';
import { getTotalSold, getAmountByProductsSold } from '@/services/ordersService';
import React, { useState, useEffect } from 'react';

interface PieChartData {
    data: number[];
    labels: string[];
}

export default function DashboardPage() {
    const [currentDate, setCurrentDate] = useState(''); // Estado para la fecha actual
    const [totalSoldData, setTotalSoldData] = useState([]); // Estado para los datos de ventas totales
    const [totalAmountSoldData, setTotalAmountSoldData] = useState([]); // Estado para las unidades vendidas
    const [amountProductsSold, setAmountProductsSold] = useState([]); // Estado para el gráfico de torta
    const [loading, setLoading] = useState(true); // Estado de carga

    // Obtener la fecha actual
    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
        const formattedDate = today.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
    }, []);

    // Cargar los datos de forma asíncrona
    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalSold = await getTotalSold('ads');
                const amountProducts = await getAmountByProductsSold('ads');

                const totalSoldData = totalSold.map(data => ({
                    x: data._id,
                    y: data.total_sales,
                }));

                const totalAmountSoldData = totalSold.map(data => ({
                    x: data._id,
                    y: data.total_quantity,
                }));

                setTotalSoldData(totalSoldData);
                setTotalAmountSoldData(totalAmountSoldData);
                setAmountProductsSold(amountProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className='bg-gray-100'>
            <div className="container flex flex-col gap-6 mx-auto min-h-screen p-6">
                {/* Encabezado con información del usuario */}
                <div className="flex justify-between items-center bg-white rounded-2xl  p-6">
                    <div className="flex items-center gap-4">
                        {/* Foto de perfil */}
                        <img
                            src="/next.svg" // Reemplaza con la ruta de la foto de perfil
                            alt="Profile Picture"
                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                        />
                        {/* Información del usuario */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Hello, Margaret</h1>
                            <p className="text-sm text-gray-500">Track you progress here. You almost reach a goal!</p>
                        </div>
                    </div>
                    {/* Fecha con ícono */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">{currentDate}</span>
                        <div className="bg-gray-200 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 4h10M3 11h18M5 11v10a2 2 0 002 2h10a2 2 0 002-2V11"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Gráfico de total recaudado */}
                    <div className="bg-white rounded-2xl  py-8 px-4 flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Recaudado</h2>
                        <TimeSerie data={totalSoldData} name="Total recaudado" width={500} />
                    </div>

                    {/* Gráfico de unidades vendidas */}
                    <div className="bg-white rounded-2xl  py-8 px-4 flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Total de Unidades Vendidas</h2>
                        <TimeSerie data={totalAmountSoldData} name="Total de unidades vendidas" width={500} />
                    </div>
                </div>

                {/* Pie chart */}
                <div className="bg-white rounded-2xl  py-8 px-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Total de Unidades Vendidas por Producto</h2>
                    <PieChart
                        data={amountProductsSold.map(data => data.total_quantity)}
                        labels={amountProductsSold.map(data => data.product_name)}
                        name="Total de unidades vendidas por producto"
                        width={500}
                    />
                </div>
            </div>
        </div>
    );
}
