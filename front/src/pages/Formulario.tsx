import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Instrumento from '../entities/Instrumento';
import { FuncionesApi } from '../services/FuncionesApi'
import Categoria from '../entities/Categoria';
import { Container } from 'react-bootstrap';


const Formulario = () => {
    const { id } = useParams();
    const [instrumentoObtenido, setInstrumentoObtenido] = useState<Instrumento>();
    const [ categorias, setCategoria ] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();

    useEffect(() => {
        const obtenerInstrumento = async () => {
            try {
              const idNumero = parseInt(id);
              const instrumentoObtenido = await FuncionesApi.getById(idNumero);
              setInstrumentoObtenido(instrumentoObtenido);
              console.log(instrumentoObtenido.categoria.denominacion)
              if (instrumentoObtenido && instrumentoObtenido.categoria) {
                setCategoriaSeleccionada(instrumentoObtenido.categoria.id.toString());
            }
            } catch (error) {
              console.error('Error al obtener los instrumentos:', error);
            }
          };

          const obtenerCategorias = async () =>{
            try{
                const categorias = await FuncionesApi.getAllCategoria();
                setCategoria(categorias);
            }catch(error){
                console.error("no se encontraron categorias", error)
            }
          }
          obtenerCategorias();
          if(id){
            obtenerInstrumento();
          }
          
    }, [])

    

    const Submit = async (event: FormEvent<HTMLFormElement>) =>{
        const idNumero = parseInt(id);
        event?.preventDefault();
        
        const {titulo, marca, modelo, imagen, precio, costo_envio, cantidad_vendida, descripcion } = event.target as HTMLFormElement;

        console.log(titulo.value, precio.value, id);

        let instrumento : Instrumento = {
            id: idNumero,
            instrumento: titulo.value,
            marca:marca.value,
            modelo:modelo.value,
            imagen:imagen.value,
            precio:precio.value,
            costoEnvio:costo_envio.value,
            cantidadVendida:cantidad_vendida.value,
            descripcion: descripcion.value,
            categoria: { id: parseInt(categoriaSeleccionada), denominacion: '' } // Agregar la categoría seleccionada

        }
        if(id){
            await FuncionesApi.updateInstrumento(instrumento.id, instrumento);
            alert("Editado exitosamente")
        }else{
            await FuncionesApi.createInstrumento(instrumento);
            alert("Creado exitosamente")
        }
        
        
        
    }


  return (
    <>
        
        <Container>
            <form onSubmit={Submit} className='center'>
                <div className="form-group">
                    <label className="form-label">Titulo</label>
                    <input type="text" name="titulo" defaultValue={instrumentoObtenido?.instrumento} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Marca</label>
                    <input type="text" name="marca" defaultValue={instrumentoObtenido?.marca} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Modelo</label>
                    <input type="text" name="modelo" defaultValue={instrumentoObtenido?.modelo} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Imagen</label>
                    <input type="text" name="imagen" defaultValue={instrumentoObtenido?.imagen} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input type="text" name="precio" defaultValue={instrumentoObtenido?.precio} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Costo Envio</label>
                    <input type="text" name='costo_envio' defaultValue={instrumentoObtenido?.costoEnvio} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Cantidad Vendida</label>
                    <input type="text" name='cantidad_vendida' defaultValue={instrumentoObtenido?.cantidadVendida} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <textarea name='descripcion' defaultValue={instrumentoObtenido?.descripcion} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <select onChange={(e) => setCategoriaSeleccionada(e.target.value)} value={categoriaSeleccionada} className="form-control">
                        <option value="">Ninguna categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.denominacion}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit" className={id ? "btn btn-primary" : "btn btn-success" }>{id?"Actualizar":"Crear"}</button>
                </div>
            </form>
        </Container>

        
    </>
  )
}

export default Formulario