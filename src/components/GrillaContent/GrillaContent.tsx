import React, { useState } from 'react';
import { Button, Modal, Form, ModalBody } from 'react-bootstrap';
import './GrillaContent.css';
import { Link, Navigate } from 'react-router-dom';
import { FuncionesApi } from '../../services/FuncionesApi'

const GrillaContent = ({ titulo = '', id=0, categoria=''}) => {
  const [ showModal, setShowModal ] = useState(false);


  const handleEliminar = async () =>{

      await FuncionesApi.deleteInstrumento(id);
      setShowModal(false);
      window.location.reload();
  }

  return (
    <>
      <div className="content_div">
        <div className="detalles_div" id="grilla_container">
          <h3>{titulo}</h3>
         
          <div>
          <Button as={Link} to={`/formulario/${id}`} variant="primary" size="lg">Modificar</Button> { ' ' }
    
            <Button variant="danger" onClick={() => setShowModal(true)}>Eliminar</Button>
            
          </div>
        </div>
      </div>

      <Modal show={showModal}>
      <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar este instrumento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GrillaContent;
