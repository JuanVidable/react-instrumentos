import React, { FormEvent, useEffect, useState } from 'react'
import GrillaContent from '../components/GrillaContent/GrillaContent'
import FuncionesApi from '../services/FuncionesApi';
import Instrumento from '../entities/Instrumento';
import { Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import './css/grilla.css'

const Grilla = () => {
    const navigate = useNavigate();
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const { filtro } = useParams();

    useEffect(() => {
      const obtenerInstrumentos = async () => {
        try {
          if(filtro){
              
              const instrumentosObtenidos = await FuncionesApi.searchInstrumento(filtro);
              setInstrumentos(instrumentosObtenidos);
          }else{
            const instrumentosObtenidos = await FuncionesApi.getAll();
            setInstrumentos(instrumentosObtenidos);
          }
  
        } catch (error) {
          console.error('Error al obtener los instrumentos:', error);
        }
      };
  
      obtenerInstrumentos();
      
    }, [filtro]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filtro = (event.target as HTMLFormElement).filtro.value;
      console.log(filtro)
        navigate(`/grilla/${filtro}`);
    }

    
  return (
    <>
        <div id='grilla-top-0'>
          <div id="grilla-top">
            <Link id='link-grilla' to={'/formulario/'}>Agregar nuevo</Link>
            <form onSubmit={handleSubmit}>
              <input id="input-filtrar" type="text" name='filtro'/>
              <button id="boton-filtrar" type='submit'>Filtrar</button>
          
            </form>
          </div>
        </div>
        {instrumentos.map((instrumento: Instrumento) => {
          
          return (
            <GrillaContent titulo={instrumento.instrumento} id={instrumento.id} categoria={instrumento.categoria.denominacion}/>
          );
        })
      }
          
        
    </>
  )
}

export default Grilla