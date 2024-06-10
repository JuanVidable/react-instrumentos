import React, { useState } from 'react';

function ReporteExcel() {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleEnviarClick = () => {
        // Realizar la llamada al endpoint con las fechas
        fetch(`http://localhost:9000/api/detalles/generar-reporte-excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
            .then(response => response.blob()) // Convertir la respuesta en un archivo Blob
            .then(blob => {
                // Crear un objeto URL para descargar el Blob
                const url = window.URL.createObjectURL(blob);

                // Crear un enlace para descargar el archivo
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'reporte.xlsx');

                // Hacer clic en el enlace para descargar el archivo
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('Error al descargar el archivo:', error);
            });
    };

    return (
        <div>
            <label>Fecha Desde:</label>
            <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
            <label>Fecha Hasta:</label>
            <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
            <button onClick={handleEnviarClick}>Generar Reporte Excel</button>
        </div>
    );
}

export default ReporteExcel;
