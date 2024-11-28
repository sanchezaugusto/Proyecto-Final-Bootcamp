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

export default function SalesCharts({salerId}) {
    const [currentDate, setCurrentDate] = useState(''); // Estado para la fecha actual
    const [totalSoldData, setTotalSoldData] = useState([]); // Estado para los datos de ventas totales
    const [totalAmountSoldData, setTotalAmountSoldData] = useState([]); // Estado para las unidades vendidas
    const [amountProductsSold, setAmountProductsSold] = useState([]); // Estado para el gráfico de torta
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(false)
    console.log(salerId)
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
                const totalSold = await getTotalSold(salerId);
                const amountProducts = await getAmountByProductsSold(salerId);

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

    if(error){
        return(
            <div>
                Error al cargar la información
            </div>
        )
    }

    return (
        <div className='bg-gray-100'>
            <div className="container flex flex-col gap-6 mx-auto min-h-screen p-6">
                

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
