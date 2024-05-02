import { Route, Routes } from "react-router-dom";

import LoginPage from '../pages/loginPage/index'; 
import Dashboard from '../pages/dashboard/index'; 

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default RoutesComponent;
