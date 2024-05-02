import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/routes'; // Importa as rotas corretamente

const App = () => {
  return (
    <Router>
      <Routes /> 
    </Router>
  );
};

export default App;
