import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/loginPage/index'; 
import Dashboard from '../pages/dashboard/index'; 
import Register from '../pages/registerPage/index';
import CadastroPontosColeta from "../pages/cadastroColetas";
import LocaisDeColeta from "../pages/locaisDeColeta";
import ListagemUsuarios from "../pages/users/index";
import ListagemLocaisDeColeta from "../pages/locaisDeColetaAdmin/index";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/cadastro-coletas" element={<CadastroPontosColeta />} />
    <Route path="/locais-de-coleta" element={<LocaisDeColeta />} />
    <Route path="/usuarios-cadastrados" element={<ListagemUsuarios />} />
    <Route path="/pontos-cadastrados" element={<ListagemLocaisDeColeta />} />

  </Routes>
);

export default RoutesComponent;
