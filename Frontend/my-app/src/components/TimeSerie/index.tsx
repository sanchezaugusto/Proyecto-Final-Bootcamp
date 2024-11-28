"use client";

import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import Chart from "react-apexcharts";

interface Props{
    data: {x: string, y: number}[],
    name: string,
    width: number
}
const TimeSerie = ({data, name, width = 500}: Props) => {
    const options: ApexOptions = {
        chart: {
            type: "line",
            zoom: {
                enabled: true
            }
        },
        xaxis: {
            type: "datetime",
        },
    }

    const series: ApexAxisChartSeries = [
        {
            data, 
            name: name
        }
    ]
  return (
    <div>
      <Chart
        options={options}
        series={series}
        width={width}
      />
    </div>
  );
};

export default TimeSerie;