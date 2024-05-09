import React from 'react'
import { useEffect, useState } from 'react'
import Instrumento from '../entities/Instrumento';
import { FuncionesApi } from '../services/FuncionesApi';
import InstrumentoCard from '../components/InstrumentoCard';
import './css/home.css'

const Home = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const obtenerInstrumentos = async () => {
      try {
        const instrumentosObtenidos = await FuncionesApi.getAll();
        setInstrumentos(instrumentosObtenidos);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
      }
    };

    obtenerInstrumentos();
  }, []);
  return (
    <>
      
      <div className='content_div'>
        <div className='instrumentos_container'>
        {instrumentos.map((instrumento:Instrumento)=>
          <InstrumentoCard id={instrumento.id} titulo={instrumento.instrumento} precio={instrumento.precio} envio={instrumento.costoEnvio} cantidadVendida={instrumento.cantidadVendida} imagen={instrumento.imagen}/>
        )}
          
        </div>
      </div>
      
    </>
    
  )
}

export default Home

