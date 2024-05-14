import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../components/protectedRoute/index';

import LoginPage from '../pages/loginPage/index';
import Dashboard from '../pages/dashboard/index';
import Register from '../pages/registerPage/index';
import CadastroPontosColeta from '../pages/cadastroColetas';
import LocaisDeColeta from '../pages/locaisDeColeta';
import ListagemUsuarios from '../pages/users/index';
import ListagemLocaisDeColeta from '../pages/locaisDeColetaAdmin/index';

const RoutesComponent = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/locais-de-coleta" element={<LocaisDeColeta />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro-coletas" element={<CadastroPontosColeta />} />
        <Route path="/usuarios-cadastrados" element={<ListagemUsuarios />} />
        <Route path="/pontos-cadastrados" element={<ListagemLocaisDeColeta />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default RoutesComponent;
