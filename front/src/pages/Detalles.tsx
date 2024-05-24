import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Instrumento from '../entities/Instrumento';
import FuncionesApi from '../services/FuncionesApi';
import './css/detalles.css'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/carritoSlice';


const Detalles = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento>();
  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerInstrumentos = async () => {
      try {
        const idNumero = parseInt(id);
        const instrumentoObtenido = await FuncionesApi.getById(idNumero);
        setInstrumento(instrumentoObtenido);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
      }
    };

    obtenerInstrumentos();
  }, []);

  

  return (
    
      <main>
        <div className='content_div_detalles'>
          <div className='content_left'>
            <div className='left_img'><img src={`/public/img/${instrumento?.imagen}`} alt="" /></div>
            <div className='left_desc'>{instrumento?.descripcion}</div>
          </div>
          <div className='content_right'>
            <p className='cantidad_vendida'>Cantidad vendida: {instrumento?.cantidadVendida}</p>
            <h3>{instrumento?.instrumento}</h3>
            <p className='precio'>${instrumento?.precio}</p>
            <p>Marca: {instrumento?.marca}<br/>Modelo: {instrumento?.modelo}</p>
            {instrumento?.costoEnvio === "G" ? <p style={{color: "green"}}>Envío gratis</p> : <p style={{color: "orange"}}>Costo de envío: ${instrumento?.costoEnvio }</p>}
            <button onClick={() => instrumento && dispatch(addItemToCart(instrumento))}>Agregar al carrito</button>
          </div>
        </div>
      </main>
    
  );
}


export default Detalles