"use client";

import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface Props{
    data: number[],
    labels: string[],
    name: string,
    width: number
}
const PieChart = ({data, labels, name, width = 500}: Props) => {
    console.log(data)
    const options: ApexOptions = {
       
        labels: labels,
        legend: {
          show: false
        },
        tooltip: {
          y: {
            formatter: (value) => `${value}%`, // Formato para mostrar porcentajes
          },
        },
    }

  return (
    <div>
      <Chart
        options={options}
        series={data}
        width={width}
        type="pie"
      />
    </div>
  );
};

export default PieChart;