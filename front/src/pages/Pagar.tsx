import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PreferenceMP from '../entities/mercadopago/PreferenceMP';
import { createPreferenceMP } from '../services/FuncionesApi';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import '../pages/css/pagar.css'

const Pagar = () => {
    const location = useLocation();
    const { pedidoCreado } = location.state || { pedidoCreado: null };
    const [idPreference, setIdPreference] = useState<string>('');

    
    const getPreferenceMP = async () => {
      console.log(pedidoCreado)
      try {
        const response = await createPreferenceMP(pedidoCreado);
        console.log(response);
    
        if (response) {
          setIdPreference(response.id);
        } else {
          alert("Error: No response received");
        }
      } catch (error) {
        console.error("Error fetching preference:", error);
        alert("Error fetching preference: " + error.message);
      }
    };
    
    initMercadoPago('TEST-c20b6b41-0c1a-4ed6-bbfb-bc591c401d8e', { locale: 'es-AR' });
  
  return (
    <>
      <div className="pagar_content">
        <h2>Total del pedido: ${pedidoCreado.total_pedido}</h2>
        <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br></br> Mercado Pago</button>
        <div className={idPreference ? 'divVisible' : 'divInvisible'}>
          <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />
        </div>
      </div>
      
    </>
  )
}

export default Pagar