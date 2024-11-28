import PieChart from '@/components/PieChart'
import TimeSerie from '@/components/TimeSerie'
import {getTotalSold, getAmountByProductsSold} from '@/services/ordersService'
import React from 'react'

interface PieChartData{
    data: number[],
    labels: string[]
}

export default async function DashboardPage() {
    const totalSold = await getTotalSold("ads")
    const amountProductsSold = await getAmountByProductsSold("ads")
    const totalSoldData = totalSold.map(data =>{
        return {x: data._id, y: data.total_sales}
    })

    const totalAmountSoldData = totalSold.map(data =>{
        return {x: data._id, y: data.total_quantity}
    })

    return (
        <>
        <TimeSerie data={totalSoldData} name='Total recaudado' width={500}/>
        <TimeSerie data={totalAmountSoldData} name='Total de unidades vendidas' width={500}/>
        <PieChart 
        data={amountProductsSold.map( data => data.total_quantity)} 
        labels={amountProductsSold.map( data => data.product_name)}
        name='Total de unidades vendidas por producto'
        width={500}
        />
        </>
    )
}
