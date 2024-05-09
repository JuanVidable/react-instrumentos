import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Detalles from "../pages/Detalles";
import QuienesSomos from "../pages/QuienesSomos";
import Grilla from "../pages/Grilla";
import Formulario from "../pages/Formulario";

const AppRoutes: React.FC = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="detalles/:id" element={<Detalles/>}/>
            <Route path="/about" element={<QuienesSomos/>}/>
            <Route path="/grilla/:filtro" element={<Grilla/>}/>
            <Route path="/grilla" element={<Grilla/>}/>
            <Route path="/formulario/:id" element={<Formulario/>}/>
            <Route path="/formulario/" element={<Formulario/>}/>
            
        </Routes>
    )
}

export default AppRoutes;