import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/loginPage/index'; 
import Dashboard from '../pages/dashboard/index'; 
import Register from '../pages/registerPage/index';
import CadastroPontosColeta from "../pages/cadastroColetas";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/cadastro-coletas" element={<CadastroPontosColeta />} />
  </Routes>
);

export default RoutesComponent;
