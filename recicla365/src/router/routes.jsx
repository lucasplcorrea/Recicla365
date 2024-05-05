import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/loginPage/index'; 
import Dashboard from '../pages/dashboard/index'; 
import Register from '../pages/registerPage/index';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default RoutesComponent;
