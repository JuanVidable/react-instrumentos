import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css'
import Carrito from '../Cart';
import Usuario from '../../entities/Usuario';
import { Roles } from '../../entities/Roles';

const Header = () => {
    const navigate = useNavigate();
    const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem('usuario'))
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario; 

    const cerrarSesion = async () => {
      localStorage.setItem('usuario', "");
      localStorage.removeItem('usuario');
      navigate('/login', {
              replace: true,
              state: {
                  logged: false
              },
      });
      window.location.reload();
  }
  return (
    <header>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Henry Musica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate ('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate ('/about')}>Sobre Nosotros</Nav.Link>
            {
              usuarioLogueado?.rol == Roles.ADMIN?
              <>
              <Nav.Link onClick={() => navigate ('/grilla')}>Grilla</Nav.Link>
              <Nav.Link onClick={() => navigate ('/reportes')}>Reportes</Nav.Link>
              </>
              :
              <div></div>
            }
        
            
            <div id='header_right'>
              <Carrito/>
              {
                  usuarioLogueado?
                  <div id='login_section'>
                    <div id='user_div'>
                     Usuario: {usuarioLogueado?.nombreUsuario} - {usuarioLogueado?.rol == Roles.ADMIN ? "Admin" : "Común"}
                    </div>
                    <button onClick={cerrarSesion} className="btn btn-success" type="button">
                        Cerrar Sesión
                    </button>
                  </div>
                  :
              
                  <div>
                    <button onClick={e => navigate('/login')} className="btn btn-success" type="button">
                        Iniciar sesión
                    </button>
                  </div>
              }
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header