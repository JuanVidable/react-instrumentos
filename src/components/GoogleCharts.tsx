import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import FuncionesApi from "../services/FuncionesApi";

export const options = {
  chart: {
    title: "Population of Largest U.S. Cities",
    subtitle: "Based on most recent and previous census data",
  },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
  bars: "horizontal",
  axes: {
    y: {
      0: { side: "right" },
    },
  },
};

export const optionsPie = {
    title: "Pedidos por instrumento",
  };

export function GoogleCharts() {
    const [data, setData] = useState<any[]>([]); 
    const [dataPie, setDataPie] = useState<any[]>([]); 

    const getBar = async () =>{
        const datos = await FuncionesApi.getDatosLine();
        console.log(datos)
        
        const chartData: any[] = [
            ["Mes y año", "Pedidos"],
            ...datos.map(data => [`${data.mes}/${data.anio}`, data.cantidad_pedidos])
          ];
        setData(chartData); 
    }

    const getPie = async () => {
        try {
            const datospie = await FuncionesApi.getDatosPie();
            const pieData = [["Instrumentos", "Pedidos"]];
            datospie.forEach(data => {
                pieData.push([data.nombre_instrumento, data.cantidad_pedidos]);
            });
            setDataPie(pieData);
        } catch (error) {
            console.error("Error al obtener los datos del pie:", error);
        }
    }

    useEffect(() => {
        getBar();
        getPie();
    },[])

  return (
    <div>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
        <Chart
          chartType="PieChart"
          data={dataPie}
          options={optionsPie}
          width={"100%"}
          height={"400px"}
        />
    </div>
  );
}
