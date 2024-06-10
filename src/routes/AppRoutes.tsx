import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Detalles from "../pages/Detalles";
import QuienesSomos from "../pages/QuienesSomos";
import Grilla from "../pages/Grilla";
import Formulario from "../pages/Formulario";
import Successmp from "../pages/Successmp";
import Failuremp from "../pages/Failuremp";
import Pendingmp from "../pages/Pendingmp";
import Pagar from "../pages/Pagar";
import Login from "../pages/Login";
import { RutaPrivada } from "../controlAcceso/RutaPrivada";
import RolUsuario from "../controlAcceso/RolUsuario";
import { Roles } from "../entities/Roles";
import Reportes from "../pages/Reportes";

const AppRoutes: React.FC = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="detalles/:id" element={<Detalles/>}/>
            <Route path="/about" element={<QuienesSomos/>}/>

            <Route element={<RolUsuario rol={Roles.ADMIN}/>}>
                <Route path="/grilla/:filtro" element={<Grilla/>}/>
            </Route>

            <Route element={<RolUsuario rol={Roles.ADMIN}/>}>
                <Route path="/grilla" element={ <Grilla/> }/>
            </Route>

            <Route element={<RolUsuario rol={Roles.ADMIN}/>}>
                <Route path="/formulario/:id" element={<Formulario/>}/>
            </Route>
            <Route element={<RolUsuario rol={Roles.ADMIN}/>}>
                <Route path="/formulario/" element={ <Formulario/> }/>
            </Route>
            <Route element={<RolUsuario rol={Roles.ADMIN}/>}>
                <Route path="/reportes" element={ <Reportes/> }/>
            </Route>
            <Route path="/mpsuccess" element={<Successmp />}/>
            <Route path="/mpfailure" element={<Failuremp />}/>
            <Route path="/mppending" element={<Pendingmp />}/>
            <Route path="/pagar" element={<Pagar />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    )
}

export default AppRoutes;