import React from 'react'
import { Container } from 'react-bootstrap'
import { useState } from 'react';
import Usuario from '../entities/Usuario'
import FuncionesApi from '../services/FuncionesApi';
import { Roles } from '../entities/Roles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const login = async () => {
        if(usuario?.nombreUsuario == undefined || usuario?.nombreUsuario === ""){
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if(usuario?.claveEncriptada == undefined || usuario?.claveEncriptada === ""){
            setTxtValidacion("Ingrese la clave");
            return;
        }
        
        //aca deberia llamar al BACKEND y validar el usuario en base de datos
        const usuariosObtenidos = await FuncionesApi.getAllUsuarios();

        for(const usuarios of usuariosObtenidos){
            if(usuario.nombreUsuario == usuarios.nombreUsuario && usuario.claveEncriptada == usuarios.claveEncriptada){
                console.log("Correcto")
                setUsuario(usuarios);
                localStorage.setItem('usuario', JSON.stringify(usuarios));
                navigate('/', {
                    replace: true,
                    state: {
                        logged: true,
                        usuario: usuarios
                    },
                });
                window.location.reload();
                
            }else{
                console.log("inCorrecto")
            }
        }

          
    }

  return (
    <>
        <Container>
            <div>
                <label htmlFor="usuario">Usuario
                    <input type="text" defaultValue={usuario.nombreUsuario} onChange={e => usuario.nombreUsuario = String(e.target.value)}/>
                </label>
                <label htmlFor="contraseña">Contraseña
                    <input type="password" defaultValue={usuario.claveEncriptada} onChange={e => usuario.claveEncriptada = String(e.target.value)} />
                </label>
                <button onClick={login}  type="button">
                        Ingresar
                </button >
            </div>
        </Container>
    </>
  )
}

export default Login